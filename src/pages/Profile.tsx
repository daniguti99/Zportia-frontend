import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ProfileFollowing from "../components/ProfilePage/ProfileFollowing";
import ProfilePublic from "../components/ProfilePage/ProfilePublic";
import ProfilePrivateLocked from "../components/ProfilePage/ProfilePrivateLocked";

import { 
  getOwnProfile, 
  getProfileById, 
  getPostById 
} from "../services/ProfileService";

import type { User } from "../interfaces/interfaces";

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

  // ============================
  // CARGAR PERFIL
  // ============================
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);
      setIsLocked(false);

      try {
        // PERFIL PROPIO
        if (Number(id) === currentUser?.id) {
          const me = await getOwnProfile();
          setProfile(me);
          return;
        }

        // PERFIL AJENO
        const data = await getProfileById(Number(id));
        setProfile(data);

      } catch (err: any) {
        const msg = err?.message || "Error inesperado";
        setError(msg);

        // PERFIL PRIVADO O BLOQUEADO
        if (
          msg.includes("privado") ||
          msg.includes("No puedes ver este perfil")
        ) {
          setIsLocked(true);
        }

      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [id, currentUser?.id]);

  // ============================
  // CARGAR POSTS DEL PERFIL
  // ============================
  useEffect(() => {
    async function loadPosts() {
      if (!id) return;

      setPostsLoading(true);

      try {
        const data = await getPostById(Number(id), 0, 12);
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
  // RENDERIZADO
  // ============================

  // LOADING PERFIL
  if (loading) return <div>Cargando perfil...</div>;

  // PERFIL PRIVADO BLOQUEADO
  if (isLocked && profile) {
    return (
      <ProfilePrivateLocked 
        user={profile} 
        posts={posts} 
        postsLoading={postsLoading}
      />
    );
  }

  // ERROR REAL DEL BACKEND
  if (error && !profile) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // PERFIL PROPIO O PERFIL SEGUIDO / PÚBLICO
  if (profile) {
    if (!profile.isPrivate || profile.followedByMe) {
      return (
        <ProfileFollowing 
          user={profile} 
          posts={posts} 
          postsLoading={postsLoading}
        />
      );
    }

    return (
      <ProfilePublic 
        user={profile} 
        posts={posts} 
        postsLoading={postsLoading}
      />
    );
  }

  return null;
}
