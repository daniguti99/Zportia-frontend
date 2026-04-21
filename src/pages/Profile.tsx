import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ProfileFollowing from "../components/ProfilePage/ProfileFollowing";
import ProfilePublic from "../components/ProfilePage/ProfilePublic";
import ProfilePrivateLocked from "../components/ProfilePage/ProfilePrivateLocked";
import "../css/profilePage/ProfilePage.css";

import {
  getOwnProfile,
  getPostById,
  getProfileById,
  getUserPosts,
} from "../services/ProfileService";

import type { User } from "../interfaces/interfaces";
import PostModal from "../components/ProfilePage/PostModal";



export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState<User | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // POSTS DEL PERFIL
  const [posts, setPosts] = useState<{ id: number; media: string }[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // MODAL
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ============================
  // CARGAR PERFIL
  // ============================
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);
      setIsLocked(false);

      try {
        // 1) Si no hay ID → cargar tu propio perfil
        if (!id || isNaN(Number(id))) {
          const me = await getOwnProfile();
          setProfile(me);
          return;
        }

        const numericId = Number(id);

        // 2) Si el ID es tuyo → cargar tu propio perfil
        if (numericId === currentUser?.id) {
          const me = await getOwnProfile();
          setProfile(me);
          return;
        }

        // 3) Perfil ajeno
        const data = await getProfileById(numericId);
        setProfile(data);

      } catch (err: any) {
        const msg = err?.message || "Error inesperado";
        setError(msg);

        if (msg.includes("privado") || msg.includes("No puedes ver este perfil")) {
          setIsLocked(true);
        }

      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [id, currentUser?.id]);

  // ============================
  // CARGAR POSTS
  // ============================
  useEffect(() => {
    async function loadPosts() {
      if (!id || isNaN(Number(id))) return;

      setPostsLoading(true);

      try {
        const data = await getUserPosts(Number(id), 0, 12);
        setPosts(data.content);
      } catch (err) {
        console.error("Error cargando posts:", err);
      } finally {
        setPostsLoading(false);
      }
    }

    loadPosts();
  }, [id]);

  // ============================
  // CARGAR POST SELECCIONADO
  // ============================
  useEffect(() => {
    async function loadPost() {
      if (!selectedPostId) return;

      try {
        const data = await getPostById(selectedPostId);
        setSelectedPost(data);
        setModalOpen(true);
      } catch (err) {
        console.error("Error cargando post:", err);
      }
    }

    loadPost();
  }, [selectedPostId]);



console.log("PROFILE:", profile);


  // ============================
  // RENDERIZADO
  // ============================

  if (loading) return <div>Cargando perfil...</div>;

  if (error && !profile) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (isLocked && profile) {
    return (
      <>
        <ProfilePrivateLocked
          user={profile}
          posts={posts}
          postsLoading={postsLoading}
          onPostClick={(id) => setSelectedPostId(id)}
        />

        {modalOpen && selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={() => {
              setModalOpen(false);
              setSelectedPostId(null);
              setSelectedPost(null);
            }}
          />
        )}
      </>
    );
  }

  if (profile) {
    return (
      <>
        {(!profile.isPrivate || profile.followedByMe) ? (
          <ProfileFollowing
            user={profile}
            posts={posts}
            postsLoading={postsLoading}
            onPostClick={(id) => setSelectedPostId(id)}
          />
        ) : (
          <ProfilePublic
            user={profile}
            posts={posts}
            postsLoading={postsLoading}
            onPostClick={(id) => setSelectedPostId(id)}
          />
        )}

        {modalOpen && selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={() => {
              setModalOpen(false);
              setSelectedPostId(null);
              setSelectedPost(null);
            }}
          />
        )}
      </>
    );
  }

  // Fallback para evitar pantalla en blanco
  return <div style={{ padding: 40 }}>No se pudo cargar el perfil</div>;
}
