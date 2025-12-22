(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/social-frontend/src/components/CreatePost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/CreatePost.tsx
__turbopack_context__.s([
    "default",
    ()=>CreatePost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CreatePost({ onPostCreated }) {
    _s();
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [postType, setPostType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TEXT");
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [video, setVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!content.trim()) {
            setError("Content cannot be empty");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const formData = new FormData();
            const requestBlob = new Blob([
                JSON.stringify({
                    content,
                    postType
                })
            ], {
                type: "application/json"
            });
            formData.append("request", requestBlob);
            if (images && postType === "IMAGE") {
                Array.from(images).forEach((file)=>{
                    formData.append("images", file);
                });
            }
            if (video && postType === "VIDEO") {
                formData.append("video", video);
            }
            // ✅ Don't set Content-Type manually for FormData
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/posts", formData);
            console.log("Post created:", response.data);
            setContent("");
            setImages(null);
            setVideo(null);
            setPostType("TEXT");
            onPostCreated();
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to create post");
        } finally{
            setLoading(false);
        }
    };
    const handleImageChange = (e_0)=>{
        setImages(e_0.target.files);
        setPostType("IMAGE");
    };
    const handleVideoChange = (e_1)=>{
        const file_0 = e_1.target.files?.[0];
        setVideo(file_0 || null);
        setPostType("VIDEO");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card p-5 mb-8 shadow-md border-surface-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-primary-600 font-bold",
                            children: "?"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: content,
                            onChange: (e_2)=>setContent(e_2.target.value),
                            placeholder: "What's happening?",
                            rows: 2,
                            className: "w-full bg-transparent border-none focus:ring-0 text-lg placeholder-surface-400 resize-none pt-2"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between pt-3 border-t border-surface-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center space-x-2 cursor-pointer p-2 hover:bg-primary-50 rounded-xl transition-all group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*",
                                            onChange: handleImageChange,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 81,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl group-hover:scale-110 transition-transform",
                                            children: "🖼️"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 82,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-surface-600 group-hover:text-primary-600",
                                            children: "Photo"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 83,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-50 rounded-xl transition-all group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "video/*",
                                            onChange: handleVideoChange,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 87,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl group-hover:scale-110 transition-transform",
                                            children: "🎥"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 88,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-surface-600 group-hover:text-blue-600",
                                            children: "Video"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                            lineNumber: 89,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                    lineNumber: 86,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading || !content.trim(),
                            className: "btn-primary px-6 py-2 rounded-full font-bold disabled:bg-surface-200 disabled:text-surface-400",
                            children: loading ? "..." : "Post"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this),
                (images || video) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-surface-50 p-3 rounded-xl flex items-center justify-between border border-surface-200 animate-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2 text-sm text-surface-600 font-medium",
                            children: images ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "📸"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                        lineNumber: 100,
                                        columnNumber: 41
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            images.length,
                                            " images selected"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                        lineNumber: 100,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🎬"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                        lineNumber: 100,
                                        columnNumber: 109
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: video?.name
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                                        lineNumber: 100,
                                        columnNumber: 125
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 99,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setImages(null);
                                setVideo(null);
                                setPostType("TEXT");
                            },
                            className: "text-red-500 hover:bg-red-50 p-1 rounded-lg",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                            lineNumber: 102,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                    lineNumber: 98,
                    columnNumber: 39
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 text-red-600 text-xs p-2 rounded-lg border border-red-100",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
                    lineNumber: 111,
                    columnNumber: 27
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
            lineNumber: 69,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/social-frontend/src/components/CreatePost.tsx",
        lineNumber: 68,
        columnNumber: 10
    }, this);
}
_s(CreatePost, "VDyRuq/A9/VvWV5DjcTbKzBRgKo=");
_c = CreatePost;
var _c;
__turbopack_context__.k.register(_c, "CreatePost");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/social-frontend/src/components/PostCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/PostCard.tsx
__turbopack_context__.s([
    "default",
    ()=>PostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PostCard({ post, onUpdate }) {
    _s();
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showComments, setShowComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getUser();
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
            const response = post.isLiked ? await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(endpoint) : await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(endpoint);
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
        const originalPost_0 = {
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
            const response_0 = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/posts/${post.id}/comments`, {
                content: newCommentText
            });
            // Update with actual data from server
            onUpdate(response_0.data);
        } catch (error_0) {
            console.error("Failed to add comment:", error_0);
            // Revert on error
            onUpdate(originalPost_0);
            setComment(newCommentText); // Put text back so user doesn't lose it
        }
    };
    // ✅ FIX: Use post.images instead of post.imageUrls
    const images = post.images || [];
    const video = post.videoUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card mb-6 animate-in bg-white border-surface-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden mr-3",
                                children: post.userProfilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: getMediaUrl(post.userProfilePicture),
                                    alt: post.username,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                    lineNumber: 94,
                                    columnNumber: 52
                                }, this) : post.username.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 93,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-surface-900 leading-tight hover:underline cursor-pointer",
                                        children: post.username
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        lineNumber: 100,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-surface-400 hover:text-surface-600 p-1 rounded-full hover:bg-surface-50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg",
                            children: "•••"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-surface-800 leading-relaxed whitespace-pre-wrap",
                    children: post.content
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid gap-1 mb-2 px-1 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`,
                children: images.map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: getMediaUrl(url),
                        alt: "Post content",
                        className: `w-full object-cover ${images.length === 1 ? 'max-h-[500px] rounded-lg' : 'h-48 rounded-md hover:opacity-95 transition-opacity'}`,
                        onError: (e)=>{
                            console.error("Image failed to load:", url);
                            e.currentTarget.style.display = 'none';
                        }
                    }, idx, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 120,
                        columnNumber: 47
                    }, this))
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 119,
                columnNumber: 35
            }, this),
            video && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-1 mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    controls: true,
                    className: "w-full rounded-lg max-h-[500px] bg-black",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                        src: getMediaUrl(video)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 129,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                    lineNumber: 128,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 127,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 flex items-center justify-between border-t border-surface-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleLike,
                                className: `flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${post.isLiked ? "bg-red-50 text-red-600 font-bold" : "text-surface-600 hover:bg-red-50 hover:text-red-500"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: post.isLiked ? "❤️" : "🤍"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 137,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.likesCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 138,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 136,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowComments(!showComments),
                                className: `flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${showComments ? "bg-primary-50 text-primary-600 font-bold" : "text-surface-600 hover:bg-primary-50 hover:text-primary-600"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 142,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.commentsCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 143,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 141,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center space-x-2 text-surface-600 hover:bg-green-50 hover:text-green-600 px-3 py-1.5 rounded-full transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "🔁"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: post.sharesCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 146,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-surface-400 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "🔖"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                            lineNumber: 153,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this),
            showComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-4 border-t border-surface-50 bg-surface-50/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 space-y-3",
                        children: post.recentComments?.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-surface-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold",
                                        children: c.username.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 161,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-surface-100 shadow-sm flex-grow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-surface-900 mb-0.5",
                                                children: c.username
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                                lineNumber: 165,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[13px] text-surface-700",
                                                children: c.content
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                                lineNumber: 166,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                        lineNumber: 164,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 160,
                                columnNumber: 56
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 159,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex mt-4 items-center space-x-2 bg-white p-1 pl-3 rounded-full border border-surface-200 focus-within:ring-2 focus-within:ring-primary-100 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: comment,
                                onChange: (e_0)=>setComment(e_0.target.value),
                                placeholder: "Write a comment...",
                                className: "flex-grow bg-transparent border-none focus:ring-0 text-sm py-1.5"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 172,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addComment,
                                disabled: !comment.trim(),
                                className: "bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:bg-surface-200 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block scale-75",
                                    children: "➤"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                    lineNumber: 174,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                                lineNumber: 173,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                        lineNumber: 171,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/PostCard.tsx",
                lineNumber: 158,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/components/PostCard.tsx",
        lineNumber: 89,
        columnNumber: 10
    }, this);
}
_s(PostCard, "u0Kxx7mJfyccRGiRky0K98Lz9Ik=");
_c = PostCard;
var _c;
__turbopack_context__.k.register(_c, "PostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/social-frontend/src/components/SuggestedUsers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/SuggestedUsers.tsx
__turbopack_context__.s([
    "default",
    ()=>SuggestedUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SuggestedUsers() {
    _s();
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getUser();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuggestedUsers.useEffect": ()=>{
            loadSuggestions();
        }
    }["SuggestedUsers.useEffect"], []);
    const loadSuggestions = async ()=>{
        try {
            // First try suggestions endpoint
            const res_0 = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/users/suggestions");
            setSuggestions(res_0.data.slice(0, 5));
        } catch (error) {
            // Fallback: search or general user fetch
            try {
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/users");
                setSuggestions(res.data.filter((u)=>u.username !== currentUser?.username).slice(0, 5));
            } catch (e) {}
        } finally{
            setLoading(false);
        }
    };
    const handleFollow = async (userId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/users/follow/${userId}`);
            // Optimistically update or reload
            loadSuggestions();
        } catch (error_0) {
            console.error("Failed to follow:", error_0);
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-pulse space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 bg-surface-100 rounded w-1/2"
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this),
            [
                1,
                2,
                3
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 bg-surface-100 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 bg-surface-100 rounded w-3/4"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                    lineNumber: 45,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 bg-surface-100 rounded w-1/2"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                    lineNumber: 42,
                    columnNumber: 33
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
        lineNumber: 40,
        columnNumber: 23
    }, this);
    if (suggestions.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card p-5 bg-white border-surface-100 shadow-sm animate-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-black text-surface-900 text-xs uppercase tracking-widest mb-5 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Who to follow"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/discover",
                        className: "text-[10px] text-primary-600 hover:underline",
                        children: "Explore"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-5",
                children: suggestions.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/profile/${user.username}`,
                                className: "flex items-center space-x-3 flex-grow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden border border-surface-100",
                                        children: user.profilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:8082${user.profilePicture}`,
                                            alt: user.username,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                            lineNumber: 61,
                                            columnNumber: 56
                                        }, this) : user.username.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                        lineNumber: 60,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-surface-900 truncate tracking-tight",
                                                children: user.fullName || user.username
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                                lineNumber: 64,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-surface-400 font-medium truncate",
                                                children: [
                                                    "@",
                                                    user.username
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                                lineNumber: 65,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                        lineNumber: 63,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleFollow(user.id),
                                className: "text-xs font-black text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-all",
                                children: "Follow"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, this)
                        ]
                    }, user.id, true, {
                        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                        lineNumber: 58,
                        columnNumber: 42
                    }, this))
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full mt-6 py-2.5 text-xs font-bold text-surface-500 hover:bg-surface-50 rounded-xl transition-colors border border-surface-100",
                children: "Show more"
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/components/SuggestedUsers.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, this);
}
_s(SuggestedUsers, "Y6SQ9gWen158vTnNd1Taqfo7lEs=");
_c = SuggestedUsers;
var _c;
__turbopack_context__.k.register(_c, "SuggestedUsers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/social-frontend/src/app/(app)/feed/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/(app)/feed/page.tsx
__turbopack_context__.s([
    "default",
    ()=>FeedPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$CreatePost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/components/CreatePost.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/components/PostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$SuggestedUsers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/components/SuggestedUsers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function FeedPage() {
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadFeed = async (pageNum = 0)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/posts/feed", {
                params: {
                    page: pageNum,
                    size: 20
                }
            });
            if (pageNum === 0) {
                setPosts(response.data.content);
            } else {
                setPosts((prev)=>[
                        ...prev,
                        ...response.data.content
                    ]);
            }
            setHasMore(response.data.number < response.data.totalPages - 1);
        } catch (error) {
            console.error("Failed to load feed:", error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedPage.useEffect": ()=>{
            loadFeed(0);
        }
    }["FeedPage.useEffect"], []);
    const handlePostUpdate = (updatedPost)=>{
        setPosts((prev_0)=>prev_0.map((p)=>p.id === updatedPost.id ? updatedPost : p));
    };
    const loadMore = ()=>{
        const nextPage = page + 1;
        setPage(nextPage);
        loadFeed(nextPage);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-surface-500 font-bold uppercase tracking-widest text-xs",
                    children: "Curating your feed..."
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
            lineNumber: 48,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$CreatePost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onPostCreated: ()=>loadFeed(0)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: posts.length > 0 ? posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                post: post,
                                onUpdate: handlePostUpdate
                            }, post.id, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                lineNumber: 58,
                                columnNumber: 59
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 bg-white rounded-2xl border border-dashed border-surface-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-4xl block mb-4",
                                    children: "🏠"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-surface-500 font-medium",
                                    children: "Your feed is quiet. Try following some people!"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/discover",
                                    className: "mt-4 inline-block btn-primary px-6 py-2 rounded-full text-sm",
                                    children: "Find People"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                            lineNumber: 58,
                            columnNumber: 129
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-12 pb-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: loadMore,
                            className: "px-8 py-3 bg-white border border-surface-200 text-surface-600 font-bold rounded-full hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm active:scale-95",
                            children: "Load More Posts"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                            lineNumber: 68,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 67,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:block space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$SuggestedUsers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-6 bg-white border-surface-100 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-black text-surface-900 text-xs uppercase tracking-widest mb-4",
                                children: "Trending"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    '#WorldNews',
                                    '#Technology',
                                    '#Sport',
                                    '#Design'
                                ].map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-surface-800 group-hover:text-primary-600 transition-colors",
                                                children: tag
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-surface-400 font-bold tracking-tight",
                                                children: "2.4k Posts"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, tag, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 88
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 text-[10px] text-surface-400 font-bold uppercase tracking-wider space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "© 2024 SOCIAL MEDIA"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                lineNumber: 88,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hover:underline cursor-pointer",
                                        children: "Privacy"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hover:underline cursor-pointer",
                                        children: "Terms"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hover:underline cursor-pointer",
                                        children: "Safety"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                        lineNumber: 87,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/app/(app)/feed/page.tsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
_s(FeedPage, "3O4THmw5NUWHFlHi6QC8cxdrr1Q=");
_c = FeedPage;
var _c;
__turbopack_context__.k.register(_c, "FeedPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=social-frontend_src_9e079feb._.js.map