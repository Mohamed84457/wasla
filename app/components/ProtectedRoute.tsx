
// "use client";

// import { ReactNode, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { useAppSelector } from "../hooks/redux";

// export default function ProtectedRoute({
//   children,
//   allowedRoles,
// }: {
//   children: ReactNode;
//   allowedRoles?: string[];
// }) {
//   const router = useRouter();

//   const { user, status } = useAppSelector(
//     (state) => state.auth,
//   );

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.replace("/login");
//       return;
//     }

//     if (
//       status === "authenticated" &&
//       user &&
//       allowedRoles &&
//       !allowedRoles.includes(user.role)
//     ) {
//       router.replace("/unauthorized");
//     }
//   }, [status, user, allowedRoles, router]);

//   if (status === "checking") {
//     return <p className="p-6">Checking your session...</p>;
//   }

//   if (status !== "authenticated" || !user) {
//     return null;
//   }

//   if (
//     allowedRoles &&
//     !allowedRoles.includes(user.role)
//   ) {
//     return null;
//   }

//   return <>{children}</>;
// }
