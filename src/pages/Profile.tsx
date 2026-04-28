import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ProfileFollowing from "../components/ProfilePage/ProfileFollowing";
import ProfilePublic from "../components/ProfilePage/ProfilePublic";
import ProfilePrivateLocked from "../components/ProfilePage/ProfilePrivateLocked";
import BlockedByUserPage from "../components/ProfilePage/BlockedByUserPage";

import "../css/profilePage/ProfilePage.css";

import {
  getOwnProfile,
  getPostById,
  getProfileById,
  getUserPosts,
} from "../services/ProfileService";

import type { PostResponse, User } from "../interfaces/interfaces";
import PostModal from "../components/ProfilePage/PostModal";
import BlockedByMePage from "../components/ProfilePage/BlockedMyBePage";
import CreatePostButton from "../components/Buttons/CreatePostButton";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // POSTS
  const [posts, setPosts] = useState<{ id: number; photo: string }[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // MODAL
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ============================
  // CARGAR PERFIL
  // ============================
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);

      try {
        if (!id || isNaN(Number(id))) {
          const me = await getOwnProfile();
          setProfile(me);
          return;
        }

        const numericId = Number(id);

        if (numericId === currentUser?.id) {
          const me = await getOwnProfile();
          setProfile(me);
          return;
        }

        const data = await getProfileById(numericId);
        setProfile(data);

      } catch (err: any) {
        setError(err?.message || "Error inesperado");
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

  if (loading) return <div>Cargando perfil...</div>;

  if (!profile) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Error</h2>
        <p>{error ?? "No se pudo cargar el perfil"}</p>
      </div>
    );
  }

  // ============================
  // LÓGICA SOCIAL
  // ============================
  const isOwnProfile = currentUser && profile.id === currentUser.id;
  const blockedMe = profile.blockedMe;
  const blockedByMe = profile.blockedByMe;
  const isPrivate = profile.isPrivate;
  const followedByMe = profile.followedByMe;

  // ============================
  // A) MI PERFIL
  // ============================
  if (isOwnProfile) {
    return (
      <>
        <ProfileFollowing
          user={profile}
          isOwnProfile={true}
          posts={posts}
          postsLoading={postsLoading}
          onPostClick={(id) => setSelectedPostId(id)}
          showCreateButton={true}
        />

        {modalOpen && selectedPost && (
          <PostModal
            post={selectedPost}
            currentUser={currentUser}
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

  // ============================
  // B) ÉL ME BLOQUEÓ
  // ============================
  if (blockedMe) {
    return (
      <BlockedByUserPage
        username={profile.username}
        photo={profile.photo}
      />
    );
  }

  // ============================
  // C) YO LO BLOQUEÉ → permitir desbloquear
  // ============================
  if (blockedByMe) {
    return (
      <BlockedByMePage
        userId={profile.id}
        username={profile.username}
        photo={profile.photo}
      />
    );
  }

  // ============================
  // D) PRIVADO Y NO LO SIGO
  // ============================
  if (isPrivate && !followedByMe) {
    return (
      <>
        <ProfilePrivateLocked
          user={profile}
          isOwnProfile={false}
          posts={posts}
          postsLoading={postsLoading}
          onPostClick={(id) => setSelectedPostId(id)}
        />

        {modalOpen && selectedPost && (
          <PostModal
            post={selectedPost}
            currentUser={currentUser}
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

  // ============================
  // E) PERFIL NORMAL (público o seguido)
  // ============================
  return (
    <>
      <ProfileFollowing
        user={profile}
        isOwnProfile={false}
        posts={posts}
        postsLoading={postsLoading}
        onPostClick={(id) => setSelectedPostId(id)}
      />

      {modalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          currentUser={currentUser}
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
