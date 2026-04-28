import { useState } from "react";
import Swal from "sweetalert2";
import {
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
} from "../../services/ProfileService";

import "../../css/profilePage/FollowBlockButtons.css";

interface Props {
    userId: number;
    followedByMe: boolean;
    requestedByMe: boolean;
    blockedByMe: boolean;
    blockedMe: boolean;
    isPrivate: boolean;
    onUpdate: () => void; // para refrescar el perfil tras una acción
}

export default function FollowBlockButtons({
    userId,
    followedByMe,
    requestedByMe,
    blockedByMe,
    blockedMe,
    isPrivate,
    onUpdate,
}: Props) {
    const [loading, setLoading] = useState(false);

    async function handleFollow() {
        try {
            setLoading(true);
            await followUser(userId);
            onUpdate();
        } catch (e: any) {
            Swal.fire({
              title: "Error",
              text: e.message,
              icon: "error",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#ff006e",
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleUnfollow() {
        try {
            setLoading(true);
            await unfollowUser(userId);
            onUpdate();
        } catch (e: any) {
            Swal.fire({
              title: "Error",
              text: e.message,
              icon: "error",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#ff006e",
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleBlock() {
        try {
            setLoading(true);
            await blockUser(userId);
            onUpdate();
        } catch (e: any) {
            Swal.fire({
              title: "Error",
              text: e.message,
              icon: "error",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#ff006e",
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleUnblock() {
        try {
            setLoading(true);
            await unblockUser(userId);
            onUpdate();
        } catch (e: any) {
            Swal.fire({
              title: "Error",
              text: e.message,
              icon: "error",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#ff006e",
            });
        } finally {
            setLoading(false);
        }
    }

    // Si él me bloqueó → no puedo hacer nada
    if (blockedMe) {
        return (
            <div className="blocked-message">
                Este usuario te ha bloqueado.
            </div>
        );
    }

    return (
        <div className="follow-block-buttons">

            {/* BLOQUEAR / DESBLOQUEAR */}
            {blockedByMe ? (
                <button className="unblock-btn" disabled={loading} onClick={handleUnblock}>
                    Desbloquear
                </button>
            ) : (
                <button className="block-btn" disabled={loading} onClick={handleBlock}>
                    Bloquear
                </button>
            )}

            {/* SEGUIR / SIGUIENDO / SOLICITUD */}
            {!blockedByMe && (
                <>
                    {followedByMe ? (
                        <button className="following-btn" disabled={loading} onClick={handleUnfollow}>
                            Siguiendo
                        </button>
                    ) : requestedByMe ? (
                        <button className="request-btn" disabled>
                            Solicitud enviada
                        </button>
                    ) : (
                        <button className="follow-btn" disabled={loading} onClick={handleFollow}>
                            {isPrivate ? "Solicitar seguir" : "Seguir"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
