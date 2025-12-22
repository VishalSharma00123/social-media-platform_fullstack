module.exports = [
"[project]/social-frontend/src/components/PostCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/PostCard.tsx
__turbopack_context__.s([
    "default",
    ()=>PostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function PostCard({ post, onUpdate }) {
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showComments, setShowComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].getUser();
    // ✅ ADD THIS: Build full URL for media
    const getMediaUrl = (path)=>{
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `http://localhost:8082${path}`; // Post Service URL
    };
    const toggleLike = async ()=>{
        // Optimistic Update
        const originalPost = {
            ...post
        };
        const isLiked = !post.isLiked;
        const likesCount = isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
        onUpdate({
            ...post,
            isLiked,
            likesCount
        });
        try {
            const endpoint = `/api/posts/${post.id}/like`;
            const response = post.isLiked ? await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(endpoint) : await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(endpoint);
            // Update with actual data from server
            onUpdate(response.data);
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Revert on error
            onUpdate(originalPost);
        }
    };
    const addComment = async ()=>{
        if (!comment.trim() || !currentUser) return;
        const originalPost = {
            ...post
        };
        const newCommentText = comment;
        setComment(""); // Clear immediately
        // Optimistic Update
        const tempComment = {
            id: `temp-${Date.now()}`,
            userId: currentUser.id,
            username: currentUser.username,
            content: newCommentText,
            createdAt: new Date().toISOString()
        };
        const updatedPost = {
            ...post,
            commentsCount: post.commentsCount + 1,
            recentComments: [
                ...post.recentComments || [],
                tempComment
            ]
        };
        onUpdate(updatedPost);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/posts/${post.id}/comments`, {
                content: newCommentText
            });
            // Update with actual data from server
            onUpdate(response.data);
        } catch (error) {
            console.error("Failed to add comment:", error);
            // Revert on error
            onUpdate(originalPost);
            setComment(newCommentText); // Put text back so user doesn't lose it
        }
    };
    // ✅ FIX: Use post.images instead of post.imageUrls
    const images = post.images || [];
    const video = post.videoUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card mb-6 animate-in bg-white border-surface-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden mr-3",
                                children: post.userProfilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: getMediaUrl(post.userProfilePicture),
                                    alt: post.username,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                    lineNumber: 101,
                                    columnNumber: 29
                                }, this) : post.username.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-surface-900 leading-tight hover:underline cursor-pointer",
                                        children: post.username
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 111,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-surface-400 uppercase tracking-wider",
                                        children: [
                                            new Date(post.createdAt).toLocaleDateString(),
                                            " • ",
                                            new Date(post.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 114,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-surface-400 hover:text-surface-600 p-1 rounded-full hover:bg-surface-50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg",
                            children: "•••"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-surface-800 leading-relaxed whitespace-pre-wrap",
                    children: post.content
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                    lineNumber: 126,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid gap-1 mb-2 px-1 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`,
                children: images.map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: getMediaUrl(url),
                        alt: "Post content",
                        className: `w-full object-cover ${images.length === 1 ? 'max-h-[500px] rounded-lg' : 'h-48 rounded-md hover:opacity-95 transition-opacity'}`,
                        onError: (e)=>{
                            console.error("Image failed to load:", url);
                            e.currentTarget.style.display = 'none';
                        }
                    }, idx, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 133,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 131,
                columnNumber: 17
            }, this),
            video && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-1 mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    controls: true,
                    className: "w-full rounded-lg max-h-[500px] bg-black",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                        src: getMediaUrl(video)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 151,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                    lineNumber: 150,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 149,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 flex items-center justify-between border-t border-surface-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleLike,
                                className: `flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${post.isLiked ? "bg-red-50 text-red-600 font-bold" : "text-surface-600 hover:bg-red-50 hover:text-red-500"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: post.isLiked ? "❤️" : "🤍"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 166,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.likesCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowComments(!showComments),
                                className: `flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${showComments ? "bg-primary-50 text-primary-600 font-bold" : "text-surface-600 hover:bg-primary-50 hover:text-primary-600"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 177,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.commentsCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 178,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 170,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center space-x-2 text-surface-600 hover:bg-green-50 hover:text-green-600 px-3 py-1.5 rounded-full transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "🔁"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 182,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.sharesCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 183,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 181,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 158,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-surface-400 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "🔖"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                            lineNumber: 188,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 187,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 157,
                columnNumber: 13
            }, this),
            showComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-4 border-t border-surface-50 bg-surface-50/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 space-y-3",
                        children: post.recentComments?.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-surface-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold",
                                        children: c.username.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 198,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-surface-100 shadow-sm flex-grow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-surface-900 mb-0.5",
                                                children: c.username
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                                lineNumber: 202,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[13px] text-surface-700",
                                                children: c.content
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                                lineNumber: 203,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 201,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 197,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 195,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex mt-4 items-center space-x-2 bg-white p-1 pl-3 rounded-full border border-surface-200 focus-within:ring-2 focus-within:ring-primary-100 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: comment,
                                onChange: (e)=>setComment(e.target.value),
                                placeholder: "Write a comment...",
                                className: "flex-grow bg-transparent border-none focus:ring-0 text-sm py-1.5"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 210,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addComment,
                                disabled: !comment.trim(),
                                className: "bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:bg-surface-200 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block scale-75",
                                    children: "➤"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                    lineNumber: 221,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 216,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 209,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 194,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
        lineNumber: 95,
        columnNumber: 9
    }, this);
}
}),
"[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/(app)/profile/[username]/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/components/PostCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function ProfilePage() {
    const { username } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].getUser();
    const isOwnProfile = currentUser?.username === username;
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('posts');
    const [postsLoading, setPostsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalConfig, setModalConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: "",
        users: [],
        loading: false
    });
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        fullName: "",
        bio: ""
    });
    const [updating, setUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const getMediaUrl = (path)=>{
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `http://localhost:8081${path}`; // User Service URL
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadProfile();
    }, [
        username
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (profile?.id) {
            loadUserPosts();
        }
    }, [
        profile?.id,
        activeTab
    ]);
    const loadProfile = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/users/profile/${username}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Failed to load profile:", error);
        } finally{
            setLoading(false);
        }
    };
    const loadUserPosts = async ()=>{
        if (!profile?.id) return;
        setPostsLoading(true);
        try {
            let endpoint = `/api/posts/user/${profile.id}`;
            if (activeTab === 'media') {
                endpoint = `/api/posts/user/${profile.id}/media`;
            } else if (activeTab === 'likes') {
                endpoint = `/api/posts/user/${profile.id}/liked`;
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(endpoint, {
                params: {
                    page: 0,
                    size: 20
                }
            });
            setPosts(response.data.content);
        } catch (error) {
            console.error(`Failed to load ${activeTab}:`, error);
        } finally{
            setPostsLoading(false);
        }
    };
    const handleFollow = async ()=>{
        if (!profile) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/users/follow/${profile.id}`);
            loadProfile();
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };
    const handleUnfollow = async ()=>{
        if (!profile) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/users/unfollow/${profile.id}`);
            loadProfile();
        } catch (error) {
            console.error("Failed to unfollow:", error);
        }
    };
    const handleMessageClick = async ()=>{
        if (!profile) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/conversations/${profile.id}`);
            router.push(`/messages/${response.data.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
        }
    };
    const handleProfilePictureUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/api/users/profile/picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            loadProfile();
        } catch (error) {
            console.error("Failed to upload picture:", error);
        }
    };
    const fetchUserList = async (type)=>{
        if (!profile) return;
        setModalConfig((prev)=>({
                ...prev,
                isOpen: true,
                title: type.charAt(0).toUpperCase() + type.slice(1),
                loading: true,
                users: []
            }));
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/users/${profile.id}/${type}`);
            setModalConfig((prev)=>({
                    ...prev,
                    users: res.data,
                    loading: false
                }));
        } catch (error) {
            console.error(`Failed to fetch ${type}:`, error);
            setModalConfig((prev)=>({
                    ...prev,
                    loading: false
                }));
        }
    };
    const handleUpdateProfile = async (e)=>{
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put("/api/users/profile/update", editForm);
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally{
            setUpdating(false);
        }
    };
    const openEditModal = ()=>{
        if (!profile) return;
        setEditForm({
            fullName: profile.fullName || "",
            bio: profile.bio || ""
        });
        setIsEditing(true);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: "Loading profile..."
        }, void 0, false, {
            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
            lineNumber: 176,
            columnNumber: 16
        }, this);
    }
    if (!profile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: "Profile not found"
        }, void 0, false, {
            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
            lineNumber: 180,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card shadow-md bg-white border-surface-200 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-48 bg-gradient-to-r from-primary-400 to-blue-500 relative"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 188,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex justify-between items-end -mt-16 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-32 h-32 rounded-full border-4 border-white shadow-lg bg-surface-100 flex items-center justify-center text-3xl font-bold text-surface-400 overflow-hidden",
                                                children: profile.profilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: profile.profilePicture,
                                                    alt: profile.username,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 37
                                                }, this) : profile.username.charAt(0).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 29
                                            }, this),
                                            isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "absolute bottom-1 right-1 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 shadow-md transition-all scale-90 group-hover:scale-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: handleProfilePictureUpload,
                                                        className: "hidden"
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm",
                                                        children: "📷"
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 25
                                    }, this),
                                    !isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleMessageClick,
                                                className: "px-6 py-2.5 bg-white border-2 border-primary-600 text-primary-600 rounded-full font-bold hover:bg-primary-50 transition-all",
                                                children: "Message"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: profile.isFollowing ? handleUnfollow : handleFollow,
                                                className: `px-8 py-2.5 rounded-full font-bold transition-all shadow-sm ${profile.isFollowing ? "bg-surface-100 text-surface-700 hover:bg-surface-200" : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md"}`,
                                                children: profile.isFollowing ? "Unfollow" : "Follow"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 29
                                    }, this),
                                    isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: openEditModal,
                                        className: "px-6 py-2 border-2 border-surface-200 text-surface-700 rounded-full font-bold hover:bg-surface-50 transition-all",
                                        children: "Edit Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 191,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-black text-surface-900",
                                        children: profile.fullName || profile.username
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-surface-500 font-medium tracking-tight",
                                        children: [
                                            "@",
                                            profile.username
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, this),
                            profile.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-surface-700 leading-relaxed max-w-2xl",
                                children: profile.bio
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 256,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-8 mt-6 pt-6 border-t border-surface-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 cursor-pointer hover:bg-surface-50 px-3 py-1.5 rounded-xl transition-all",
                                        onClick: ()=>fetchUserList('followers'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl font-black text-surface-900",
                                                children: profile.followersCount
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-surface-500 uppercase tracking-widest",
                                                children: "Followers"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 cursor-pointer hover:bg-surface-50 px-3 py-1.5 rounded-xl transition-all",
                                        onClick: ()=>fetchUserList('following'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl font-black text-surface-900",
                                                children: profile.followingCount
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-surface-500 uppercase tracking-widest",
                                                children: "Following"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 261,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 190,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                lineNumber: 186,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4 border-b border-surface-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('posts'),
                                className: `px-4 py-3 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'posts' ? "border-primary-600 text-primary-600" : "border-transparent text-surface-400 hover:text-surface-600"}`,
                                children: "Posts"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 282,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('media'),
                                className: `px-4 py-3 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'media' ? "border-primary-600 text-primary-600" : "border-transparent text-surface-400 hover:text-surface-600"}`,
                                children: "Media"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 291,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('likes'),
                                className: `px-4 py-3 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'likes' ? "border-primary-600 text-primary-600" : "border-transparent text-surface-400 hover:text-surface-600"}`,
                                children: "Likes"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 300,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 281,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: postsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-20 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 314,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-black text-surface-400 tracking-[0.2em] uppercase",
                                    children: [
                                        "Loading ",
                                        activeTab,
                                        "..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 315,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                            lineNumber: 313,
                            columnNumber: 25
                        }, this) : posts.length > 0 ? posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                post: post,
                                onUpdate: (updated)=>{
                                    setPosts((prev)=>{
                                        // If we are on the likes tab and the post was unliked, remove it
                                        if (activeTab === 'likes' && !updated.isLiked) {
                                            return prev.filter((p)=>p.id !== updated.id);
                                        }
                                        // If we are on the media tab and media was removed (though unlikely via this UI)
                                        if (activeTab === 'media' && !updated.images?.length && !updated.videoUrl) {
                                            return prev.filter((p)=>p.id !== updated.id);
                                        }
                                        return prev.map((p)=>p.id === updated.id ? updated : p);
                                    });
                                }
                            }, post.id, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 319,
                                columnNumber: 29
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-surface-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-5xl block mb-4",
                                    children: activeTab === 'posts' ? '📭' : activeTab === 'media' ? '🖼️' : '❤️'
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 339,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-surface-500 font-bold text-lg",
                                    children: activeTab === 'posts' ? 'No posts yet' : activeTab === 'media' ? 'No media found' : 'No liked posts yet'
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 342,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-surface-400 text-sm mt-1 font-medium italic",
                                    children: isOwnProfile ? "Time to share something with the world!" : `@${username} hasn't shared anything here.`
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 345,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                            lineNumber: 338,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                lineNumber: 280,
                columnNumber: 13
            }, this),
            modalConfig.isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in",
                onClick: ()=>setModalConfig((prev)=>({
                            ...prev,
                            isOpen: false
                        })),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-surface-900/40 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 359,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-4 border-b border-surface-100 flex items-center justify-between bg-white sticky top-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-black text-surface-900 tracking-tight",
                                        children: modalConfig.title
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setModalConfig((prev)=>({
                                                    ...prev,
                                                    isOpen: false
                                                })),
                                        className: "p-2 hover:bg-surface-100 rounded-full transition-colors text-surface-400 hover:text-surface-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-5 w-5",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 370,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 364,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-[60vh] overflow-y-auto px-2 py-2 bg-surface-50/30",
                                children: modalConfig.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center py-12 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-surface-400 tracking-widest uppercase",
                                            children: "Loading..."
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 33
                                }, this) : modalConfig.users.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: modalConfig.users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>{
                                                setModalConfig((prev)=>({
                                                        ...prev,
                                                        isOpen: false
                                                    }));
                                                router.push(`/profile/${user.username}`);
                                            },
                                            className: "flex items-center justify-between p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-full bg-primary-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-primary-600 font-bold",
                                                            children: user.profilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: getMediaUrl(user.profilePicture),
                                                                alt: user.username,
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 57
                                                            }, this) : user.username.charAt(0).toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-surface-900 group-hover:text-primary-600 transition-colors",
                                                                    children: user.fullName || user.username
                                                                }, void 0, false, {
                                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-surface-500 font-medium tracking-tight",
                                                                    children: [
                                                                        "@",
                                                                        user.username
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                                    lineNumber: 409,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-surface-300 group-hover:text-primary-400 transition-colors mr-2",
                                                    children: "›"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, user.id, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-4xl block mb-2",
                                            children: "👤"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-surface-500 font-bold",
                                            children: [
                                                "No ",
                                                modalConfig.title.toLowerCase(),
                                                " yet"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 417,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                lineNumber: 376,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 360,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                lineNumber: 355,
                columnNumber: 17
            }, this),
            isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in",
                onClick: ()=>setIsEditing(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-surface-900/60 backdrop-blur-md"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 433,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleUpdateProfile,
                            className: "flex flex-col h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-8 py-6 border-b border-surface-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-black text-surface-900 tracking-tight",
                                                    children: "Edit Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-surface-400",
                                                    children: "Update your public information"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 440,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsEditing(false),
                                            className: "p-2.5 hover:bg-surface-100 rounded-full transition-all text-surface-400 hover:text-surface-900 hover:rotate-90 duration-300",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-6 w-6",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2.5,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 444,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 439,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 space-y-8 bg-surface-50/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-black text-surface-400 uppercase tracking-[0.2em] ml-1",
                                                    children: "Full Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    autoFocus: true,
                                                    type: "text",
                                                    value: editForm.fullName,
                                                    onChange: (e)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                fullName: e.target.value
                                                            })),
                                                    className: "w-full bg-white border-2 border-surface-100 rounded-2xl px-6 py-4 text-surface-900 font-bold placeholder-surface-300 focus:border-primary-500 focus:ring-0 transition-all shadow-sm focus:shadow-md",
                                                    placeholder: "Add your full name..."
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-black text-surface-400 uppercase tracking-[0.2em] ml-1",
                                                    children: "Bio"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: editForm.bio,
                                                    onChange: (e)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                bio: e.target.value
                                                            })),
                                                    rows: 4,
                                                    className: "w-full bg-white border-2 border-surface-100 rounded-2xl px-6 py-4 text-surface-900 font-medium placeholder-surface-300 focus:border-primary-500 focus:ring-0 transition-all shadow-sm focus:shadow-md resize-none",
                                                    placeholder: "Tell us a bit about yourself..."
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-surface-400 font-bold text-right mr-1 tracking-wider uppercase",
                                                    children: [
                                                        editForm.bio.length,
                                                        " / 160"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-8 py-6 bg-white border-t border-surface-100 flex items-center justify-end space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsEditing(false),
                                            className: "px-8 py-3.5 text-sm font-black text-surface-600 hover:text-surface-900 hover:bg-surface-50 rounded-2xl transition-all tracking-wider uppercase",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 484,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: updating,
                                            className: "px-10 py-3.5 bg-primary-600 text-white rounded-2xl font-black text-sm hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 active:scale-95 disabled:bg-surface-200 transition-all tracking-wider uppercase flex items-center space-x-2",
                                            children: updating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Saving..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Save Changes"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                                    lineNumber: 483,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                            lineNumber: 438,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                        lineNumber: 434,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
                lineNumber: 429,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/app/(app)/profile/[username]/page.tsx",
        lineNumber: 184,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=social-frontend_src_cc535382._.js.map