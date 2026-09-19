(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/findings/[findingId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FindingDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/orchestrator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SeverityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SeverityBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/StatusBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2f$CodeViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/code/CodeViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-code.mjs [app-client] (ecmascript) <export default as FileCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.mjs [app-client] (ecmascript) <export default as UserCheck>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function FindingDetailPage({ params }) {
    _s();
    const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [finding, setFinding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FindingDetailPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].getFindingById(resolvedParams.findingId).then({
                "FindingDetailPage.useEffect": (f)=>{
                    if (f) setFinding(f);
                }
            }["FindingDetailPage.useEffect"]);
        }
    }["FindingDetailPage.useEffect"], [
        resolvedParams.findingId
    ]);
    const handleRemediate = async ()=>{
        if (!finding) return;
        setIsGenerating(true);
        const rem = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].startRemediation(finding.id);
        setTimeout(()=>{
            router.push(`/remediation/${rem.id}`);
        }, 400);
    };
    if (!finding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-12 text-center text-gray-400 font-mono text-xs",
                children: [
                    "Loading security finding ",
                    resolvedParams.findingId,
                    "..."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 sm:space-y-5 max-w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/findings",
                    className: "inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-mono",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Back to Findings"
                        }, void 0, false, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-sm font-bold text-gray-100",
                                            children: finding.id
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SeverityBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeverityBadge"], {
                                            severity: finding.severity
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                            status: finding.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-800/40 text-emerald-400 font-semibold shrink-0",
                                            children: "AUTO-REMEDIATION ELIGIBLE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-base sm:text-lg font-bold text-gray-100 font-sans mt-1.5",
                                    children: finding.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-400 font-mono mt-0.5 truncate",
                                    children: [
                                        "Repository: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-200",
                                            children: finding.repository
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 27
                                        }, this),
                                        " • File:",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-200",
                                            children: [
                                                finding.file,
                                                ":",
                                                finding.startLine
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRemediate,
                                    disabled: isGenerating,
                                    className: "flex items-center gap-2 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-100 border border-[#30363d] text-xs font-semibold transition-colors disabled:opacity-60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                            className: `w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isGenerating ? 'Generating Patch...' : 'Remediate Finding'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>alert('Finding marked for human triage review.'),
                                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0d1117] hover:bg-[#21262d] text-gray-300 border border-[#30363d] text-xs font-medium transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                            className: "w-3.5 h-3.5 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Human Review"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 text-[10px] block uppercase font-medium",
                                    children: "CLASSIFICATION"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-200 font-semibold block mt-0.5 truncate",
                                    children: finding.cwe
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 block truncate",
                                    children: finding.owasp
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 text-[10px] block uppercase font-medium",
                                    children: "SCANNER TOOL"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-200 font-semibold block mt-0.5 truncate",
                                    children: finding.tool
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-emerald-400 block font-semibold",
                                    children: [
                                        finding.confidence,
                                        "% Confidence"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 text-[10px] block uppercase font-medium",
                                    children: "COMMIT ORIGIN"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-200 font-semibold block mt-0.5 truncate",
                                    children: finding.commitSha
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 block truncate",
                                    children: [
                                        "PR ",
                                        finding.introducedByPR
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#161b22] p-2.5 rounded border border-[#30363d] min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 text-[10px] block uppercase font-medium",
                                    children: "FIXABILITY"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-400 font-semibold block mt-0.5 truncate",
                                    children: finding.fixability
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 block truncate",
                                    children: "Deterministic Patch"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__["FileCode"], {
                                    className: "w-4 h-4 text-gray-400 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm font-semibold text-gray-200",
                                    children: "Vulnerable Code Snippet Evidence"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2f$CodeViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeViewer"], {
                            filePath: finding.file,
                            startLine: finding.startLine,
                            snippet: finding.evidence.snippet,
                            vulnerableLineNumber: 42,
                            explanation: finding.evidence.explanation
                        }, void 0, false, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#161b22] border border-[#30363d] rounded p-3.5 sm:p-4 space-y-2 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-amber-400 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    className: "w-4 h-4 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Why This Is Dangerous"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 leading-relaxed font-sans",
                            children: [
                                "The scanner identified direct string concatenation of user-supplied variables into an active SQL query structure. An attacker sending malicious input such as ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    className: "bg-[#0d1117] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px] break-all",
                                    children: "' OR '1'='1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 57
                                }, this),
                                " could alter the SQL execution tree, bypassing login checks or exposing non-public database tables."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/[findingId]/page.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/findings/[findingId]/page.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/findings/[findingId]/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(FindingDetailPage, "hKvVMOW/CNOCrkhgzgb12fbhRqU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FindingDetailPage;
var _c;
__turbopack_context__.k.register(_c, "FindingDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/code/CodeViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeViewer",
    ()=>CodeViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-code.mjs [app-client] (ecmascript) <export default as FileCode>");
'use client';
;
;
function CodeViewer({ filePath, startLine, snippet, vulnerableLineNumber = 42, explanation }) {
    const lines = snippet.split('\n');
    const handleCopy = ()=>{
        navigator.clipboard.writeText(snippet);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded border border-[#30363d] bg-[#0d1117] overflow-hidden font-mono text-xs max-w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-gray-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__["FileCode"], {
                                className: "w-3.5 h-3.5 text-gray-400 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-gray-200 truncate max-w-[140px] sm:max-w-xs md:max-w-none",
                                children: filePath
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-gray-500 bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] shrink-0",
                                children: [
                                    "Lines ",
                                    startLine,
                                    " - ",
                                    startLine + lines.length - 1
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCopy,
                        className: "flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-200 bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded transition-colors shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Copy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/code/CodeViewer.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-1 overflow-x-auto max-w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full border-collapse min-w-max",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: lines.map((lineText, idx)=>{
                            const match = lineText.match(/^(\d+):\s?(.*)$/);
                            let lineNum = startLine + idx;
                            let code = lineText;
                            if (match) {
                                lineNum = parseInt(match[1], 10);
                                code = match[2];
                            }
                            const isVulnerable = lineNum === vulnerableLineNumber || lineText.includes('SELECT * FROM users');
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: isVulnerable ? 'bg-red-950/30 border-l-2 border-red-500 text-red-300' : 'hover:bg-[#161b22]/50 text-gray-300',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "w-10 py-1 pr-3 text-right text-gray-600 select-none text-[11px] font-mono border-r border-[#30363d]/40 shrink-0",
                                        children: lineNum
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                                        lineNumber: 74,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-1 pl-3 whitespace-pre code-font",
                                        children: [
                                            isVulnerable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center gap-1 text-[10px] bg-red-500/15 text-red-400 border border-red-800/40 px-1.5 py-0.2 rounded mr-2 select-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-2.5 h-2.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 25
                                                    }, this),
                                                    "VULNERABLE LINE"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                                lineNumber: 79,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: code
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                                lineNumber: 84,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                                        lineNumber: 77,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 66,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/code/CodeViewer.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/code/CodeViewer.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 bg-[#161b22] border-t border-[#30363d] flex items-start gap-2 text-xs font-sans text-gray-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-gray-200 block",
                                children: "Security Context"
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 leading-relaxed mt-0.5",
                                children: explanation
                            }, void 0, false, {
                                fileName: "[project]/src/components/code/CodeViewer.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/code/CodeViewer.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/code/CodeViewer.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/code/CodeViewer.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = CodeViewer;
var _c;
__turbopack_context__.k.register(_c, "CodeViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$simulator$2f$DemoControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/simulator/DemoControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mode/modeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AppShellContent({ children }) {
    _s();
    const { isDemoMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"])();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleMobileMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppShellContent.useCallback[toggleMobileMenu]": ()=>{
            setIsMobileMenuOpen({
                "AppShellContent.useCallback[toggleMobileMenu]": (prev)=>!prev
            }["AppShellContent.useCallback[toggleMobileMenu]"]);
        }
    }["AppShellContent.useCallback[toggleMobileMenu]"], []);
    const closeMobileMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppShellContent.useCallback[closeMobileMenu]": ()=>{
            setIsMobileMenuOpen(false);
        }
    }["AppShellContent.useCallback[closeMobileMenu]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen bg-[#090d16] text-gray-100 antialiased overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                isMobileOpen: isMobileMenuOpen,
                onCloseMobile: closeMobileMenu
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppShell.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0 min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                        onToggleMobileMenu: toggleMobileMenu
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    isDemoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$simulator$2f$DemoControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoControls"], {}, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 33,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-w-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto w-full min-w-0",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/AppShell.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/AppShell.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/AppShell.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(AppShellContent, "6BS47a0HG1QftcUUDcq68VDxjBw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"]
    ];
});
_c = AppShellContent;
function AppShell({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppModeProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppShellContent, {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppShell.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/AppShell.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c1 = AppShell;
var _c, _c1;
__turbopack_context__.k.register(_c, "AppShellContent");
__turbopack_context__.k.register(_c1, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.mjs [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.mjs [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.mjs [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/orchestrator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mode/modeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Header({ onToggleMobileMenu }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setMode, isDemoMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isResetting, setIsResetting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleResetDemo = async ()=>{
        setIsResetting(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].resetDemoData();
        setTimeout(()=>{
            setIsResetting(false);
            router.push('/dashboard');
        }, 300);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "h-12 border-b border-[#30363d] bg-[#161b22] px-3 sm:px-4 flex items-center justify-between sticky top-0 z-20 font-sans text-xs gap-2 min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-1 min-w-0 max-w-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onToggleMobileMenu,
                        "aria-label": "Toggle Menu",
                        className: "md:hidden p-1.5 rounded text-gray-400 hover:text-gray-100 hover:bg-[#21262d] transition-colors shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-gray-300 font-mono shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                className: "w-3.5 h-3.5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate max-w-[120px] md:max-w-none",
                                children: isDemoMode ? 'acme-corp/payments-api' : 'acme-corp/main-service'
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Search findings, rules...",
                                className: "w-full bg-[#0d1117] border border-[#30363d] rounded pl-8 pr-2.5 py-1 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 sm:gap-2 shrink-0 font-mono",
                children: [
                    isDemoMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-2 py-1 rounded bg-amber-950/40 text-amber-400 border border-amber-800/50 text-[11px] font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "DEMO MODE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "DEMO"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleResetDemo,
                                disabled: isResetting,
                                title: "Reset simulated demo state",
                                className: "hidden sm:flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-400 bg-[#0d1117] border border-[#30363d] hover:text-gray-200 hover:border-gray-500 transition-colors disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: `w-3 h-3 ${isResetting ? 'animate-spin' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('normal'),
                                title: "Exit Demo Mode and return to Normal product",
                                className: "flex items-center gap-1 px-2 py-1 rounded text-xs text-red-300 bg-red-950/30 border border-red-900/50 hover:bg-red-900/40 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "Exit Demo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "Exit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this) : /* Normal Mode Environment Control */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline text-gray-400 text-[11px]",
                                children: "Env:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.5 rounded bg-[#0d1117] text-emerald-400 border border-emerald-900/50 text-[11px] font-medium",
                                children: "Normal"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('demo'),
                                title: "Enter interactive simulation Demo Mode",
                                className: "flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-300 bg-[#0d1117] border border-[#30363d] hover:text-gray-100 hover:border-gray-500 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                        className: "w-3.5 h-3.5 text-amber-400 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "Enter Demo Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "Demo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                className: "w-3.5 h-3.5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px]",
                                children: "v1.62"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Header, "dstcZuB9VC8dtDY1RkHbescLQ7g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.mjs [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search-code.mjs [app-client] (ecmascript) <export default as SearchCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$pull$2d$request$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitPullRequest$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-pull-request.mjs [app-client] (ecmascript) <export default as GitPullRequest>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.mjs [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mode/modeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Sidebar({ isMobileOpen = false, onCloseMobile }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isDemoMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"])();
    const navigationItems = [
        {
            name: 'Overview',
            href: '/dashboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            name: 'Repositories',
            href: '/repositories',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
        },
        {
            name: 'Findings',
            href: '/findings',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchCode$3e$__["SearchCode"]
        },
        {
            name: 'Remediations',
            href: isDemoMode ? '/remediation/REM-SEC-001' : '/findings',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"]
        },
        {
            name: 'Pull Requests',
            href: '/pull-requests',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$pull$2d$request$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitPullRequest$3e$__["GitPullRequest"]
        },
        {
            name: 'Audit Log',
            href: '/audit',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
        }
    ];
    const sidebarContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-between h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-[#30363d] flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                onClick: onCloseMobile,
                                className: "flex items-center gap-2 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-gray-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "leading-tight",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-xs tracking-tight text-gray-200 block",
                                                children: "Pre-Prod"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-gray-500 uppercase tracking-wider block font-mono",
                                                children: "Orchestrator"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    isDemoMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/50 text-[10px] font-mono text-amber-400 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "DEMO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-[10px] font-mono text-emerald-400 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 rounded-full bg-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "NORMAL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    onCloseMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onCloseMobile,
                                        "aria-label": "Close menu",
                                        className: "md:hidden p-1 rounded text-gray-400 hover:text-gray-100 hover:bg-[#21262d] transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "p-2 space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-1 text-[10px] uppercase font-mono font-semibold text-gray-500 tracking-wider",
                                children: "Navigation"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            navigationItems.map((item)=>{
                                const isActive = pathname === item.href || item.href !== '/dashboard' && pathname.startsWith(item.href);
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: onCloseMobile,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors', isActive ? 'bg-[#21262d] text-gray-100 font-semibold border border-[#30363d]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#21262d]/50 border border-transparent'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('w-3.5 h-3.5', isActive ? 'text-gray-200' : 'text-gray-500')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 border-t border-[#30363d] bg-[#0d1117]/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-xs text-gray-400 font-mono",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                            className: "w-3.5 h-3.5 text-gray-500 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-500 block",
                                    children: "TARGET REPO"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-300 font-medium truncate block",
                                    children: isDemoMode ? 'payments-api' : 'main-service'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden md:flex w-56 border-r border-[#30363d] bg-[#161b22] flex-col justify-between h-screen sticky top-0 shrink-0 select-none font-sans text-xs",
                children: sidebarContent
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            isMobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 md:hidden flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: onCloseMobile,
                        className: "fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "relative z-50 w-64 max-w-[80vw] bg-[#161b22] border-r border-[#30363d] h-full shadow-2xl flex flex-col justify-between font-sans text-xs",
                        children: sidebarContent
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "Xh3705Z3+VKcsZRfmKwqQMAv1RE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mode$2f$modeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMode"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/simulator/DemoControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoControls",
    ()=>DemoControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$stateMachine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/stateMachine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$simulator$2f$ScenarioSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/simulator/ScenarioSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.mjs [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skip-forward.mjs [app-client] (ecmascript) <export default as SkipForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fast$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FastForward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/fast-forward.mjs [app-client] (ecmascript) <export default as FastForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function DemoControls() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].getStatus());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DemoControls.useEffect": ()=>{
            const update = {
                "DemoControls.useEffect.update": ()=>setStatus(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].getStatus())
            }["DemoControls.useEffect.update"];
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].subscribe(update);
        }
    }["DemoControls.useEffect"], []);
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$stateMachine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStateMetadata"])(status.currentState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#161b22] border-b border-[#30363d] px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 sm:gap-3 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$simulator$2f$ScenarioSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScenarioSelector"], {}, void 0, false, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3.5 w-px bg-[#30363d] hidden sm:block"
                    }, void 0, false, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 font-mono text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 font-medium hidden sm:inline",
                                children: "State:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold border uppercase truncate', meta.badgeStyle),
                                children: meta.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-gray-500 font-mono",
                                children: [
                                    "(",
                                    status.stateIndex + 1,
                                    "/",
                                    status.totalStates,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center flex-wrap gap-1.5 font-mono text-xs",
                children: [
                    status.isRunning && !status.isPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].pause(),
                        className: "flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-amber-400 border border-amber-800/40 font-semibold transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                className: "w-3 h-3 fill-current"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Pause"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].start(),
                        disabled: status.isCompleted,
                        className: "flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-100 border border-[#30363d] font-semibold transition-colors disabled:opacity-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "w-3 h-3 fill-current"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: status.isPaused ? 'Resume' : 'Run Demo'
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].nextStep(),
                        disabled: status.isCompleted || status.isRunning && !status.isPaused,
                        title: "Advance to next state",
                        className: "flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 border border-[#30363d] font-semibold transition-colors disabled:opacity-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__["SkipForward"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Next Step"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    status.isFailed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].retry(),
                        className: "flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 font-semibold transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Retry"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].fastForward(),
                        disabled: status.isCompleted,
                        title: "Instantly complete scenario",
                        className: "p-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-400 hover:text-gray-200 border border-[#30363d] transition-colors disabled:opacity-40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fast$2d$forward$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FastForward$3e$__["FastForward"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/simulator/DemoControls.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].reset(),
                        title: "Reset scenario state",
                        className: "flex items-center gap-1 px-2 py-1 rounded bg-[#0d1117] hover:bg-[#21262d] text-gray-400 hover:text-gray-200 border border-[#30363d] transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/simulator/DemoControls.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/simulator/DemoControls.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/simulator/DemoControls.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(DemoControls, "0oXDdmhvBH3X5qFiMD6QvZyV8+Y=");
_c = DemoControls;
var _c;
__turbopack_context__.k.register(_c, "DemoControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/simulator/ScenarioSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScenarioSelector",
    ()=>ScenarioSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$scenarios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/scenarios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ScenarioSelector() {
    _s();
    const [activeScenarioId, setActiveScenarioId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('sql-injection');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScenarioSelector.useEffect": ()=>{
            const update = {
                "ScenarioSelector.useEffect.update": ()=>{
                    setActiveScenarioId(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].getStatus().activeScenario.id);
                }
            }["ScenarioSelector.useEffect.update"];
            update();
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].subscribe(update);
        }
    }["ScenarioSelector.useEffect"], []);
    const handleChange = (e)=>{
        const newId = e.target.value;
        setActiveScenarioId(newId);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].setScenario(newId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 font-mono text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                className: "w-3.5 h-3.5 text-gray-400 shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/simulator/ScenarioSelector.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500 select-none hidden sm:inline",
                children: "Scenario:"
            }, void 0, false, {
                fileName: "[project]/src/components/simulator/ScenarioSelector.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: activeScenarioId,
                onChange: handleChange,
                className: "bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-xs text-gray-200 font-medium focus:outline-none focus:border-gray-500 cursor-pointer",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$scenarios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SCENARIOS"].map((sc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: sc.id,
                        children: sc.name
                    }, sc.id, false, {
                        fileName: "[project]/src/components/simulator/ScenarioSelector.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/simulator/ScenarioSelector.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/simulator/ScenarioSelector.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ScenarioSelector, "v8jN4GEeiuUxEVAxwhe6fyotC28=");
_c = ScenarioSelector;
var _c;
__turbopack_context__.k.register(_c, "ScenarioSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SeverityBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeverityBadge",
    ()=>SeverityBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
;
function SeverityBadge({ severity, showDot = true, className }) {
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSeverityStyle"])(severity);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider border select-none', style.badge, className),
        children: [
            showDot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('w-1.5 h-1.5 rounded-full shrink-0', style.dot)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SeverityBadge.tsx",
                lineNumber: 23,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: severity
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SeverityBadge.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SeverityBadge.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = SeverityBadge;
var _c;
__turbopack_context__.k.register(_c, "SeverityBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/StatusBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/formatting.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
;
function StatusBadge({ status, type = 'finding', className }) {
    let badgeStyle = 'bg-slate-800/60 text-slate-300 border-slate-700';
    if (type === 'finding') {
        badgeStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFindingStatusStyle"])(status);
    } else if (type === 'step') {
        badgeStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStepStatusStyle"])(status).badge;
    } else if (type === 'pr') {
        badgeStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$formatting$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPRStatusStyle"])(status);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium uppercase tracking-wider border select-none', badgeStyle, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: status.replace(/_/g, ' ')
        }, void 0, false, {
            fileName: "[project]/src/components/ui/StatusBadge.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/StatusBadge.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/adapters/apiAdapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiAdapter",
    ()=>ApiAdapter,
    "apiAdapter",
    ()=>apiAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
class ApiAdapter {
    listeners = new Set();
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((l)=>l());
    }
    async getMetrics() {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/metrics');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapDashboardMetrics"])(dto);
    }
    async getRepositories() {
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/repositories');
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRepository"]);
    }
    async getRepositoryByName(name) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/repositories/${encodeURIComponent(name)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRepository"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getFindings() {
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/findings');
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapFinding"]);
    }
    async getFindingById(id) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/findings/${encodeURIComponent(id)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapFinding"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getRemediationByFindingId(findingId) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/remediations/finding/${encodeURIComponent(findingId)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRemediation"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getRemediationById(id) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/remediations/${encodeURIComponent(id)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRemediation"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getValidationByRemediationId(remediationId) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/validations/remediation/${encodeURIComponent(remediationId)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapValidation"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getValidationById(id) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/validations/${encodeURIComponent(id)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapValidation"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getPullRequests() {
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/pull-requests');
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPullRequest"]);
    }
    async getPullRequestById(id) {
        try {
            const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/pull-requests/${encodeURIComponent(id)}`);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPullRequest"])(dto);
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && err.kind === 'NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getAuditEvents() {
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/audit');
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapAuditEvent"]);
    }
    async startRemediation(findingId) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/remediations', {
            findingId
        });
        this.notify();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRemediation"])(dto);
    }
    async runValidation(validationId, _onStepUpdate) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/validations/${encodeURIComponent(validationId)}/run`);
        this.notify();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapValidation"])(dto);
    }
    async resetState() {
        this.notify();
    }
}
const apiAdapter = new ApiAdapter();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/adapters/demoAdapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoAdapter",
    ()=>DemoAdapter,
    "demoAdapter",
    ()=>demoAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo/state.ts [app-client] (ecmascript)");
;
class DemoAdapter {
    subscribe(listener) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].subscribe(listener);
    }
    async getMetrics() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getMetrics();
    }
    async getRepositories() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getRepositories();
    }
    async getRepositoryByName(name) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getRepositoryByName(name);
    }
    async getFindings() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getFindings();
    }
    async getFindingById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getFindingById(id);
    }
    async getRemediationByFindingId(findingId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getRemediationByFindingId(findingId);
    }
    async getRemediationById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getRemediationById(id);
    }
    async getValidationByRemediationId(remediationId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getValidationByRemediationId(remediationId);
    }
    async getValidationById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getValidationById(id);
    }
    async getPullRequests() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getPullRequests();
    }
    async getPullRequestById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getPullRequestById(id);
    }
    async getAuditEvents() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getAuditEvents();
    }
    async startRemediation(findingId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].startRemediation(findingId);
    }
    async runValidation(validationId, onStepUpdate) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].runValidationSimulation(validationId, onStepUpdate);
    }
    async resetState() {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].resetState();
    }
}
const demoAdapter = new DemoAdapter();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiClient",
    ()=>ApiClient,
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/errors.ts [app-client] (ecmascript)");
;
class ApiClient {
    baseUrl;
    constructor(baseUrl){
        this.baseUrl = baseUrl || ("TURBOPACK compile-time value", "http://localhost:8000") || 'http://localhost:8000';
        // Remove trailing slash if present
        if (this.baseUrl.endsWith('/')) {
            this.baseUrl = this.baseUrl.slice(0, -1);
        }
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    setBaseUrl(url) {
        this.baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    }
    async request(path, options = {}) {
        const { timeoutMs = 10000, headers, ...customConfig } = options;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const url = `${this.baseUrl}${cleanPath}`;
        const controller = new AbortController();
        const timer = setTimeout(()=>controller.abort(), timeoutMs);
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers
            },
            signal: controller.signal,
            ...customConfig
        };
        try {
            const response = await fetch(url, config);
            clearTimeout(timer);
            if (!response.ok) {
                let errorDetail;
                try {
                    const errData = await response.json();
                    errorDetail = errData.detail || errData.message;
                } catch  {
                // Ignore JSON parse errors for non-ok responses
                }
                throw __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"].fromStatusCode(response.status, errorDetail);
            }
            if (response.status === 204) {
                return {};
            }
            const data = await response.json();
            return data;
        } catch (err) {
            clearTimeout(timer);
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
                throw err;
            }
            if (err instanceof Error && err.name === 'AbortError') {
                throw __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"].timeout();
            }
            throw __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"].networkError(err instanceof Error ? err : undefined);
        }
    }
    async get(path, options) {
        return this.request(path, {
            ...options,
            method: 'GET'
        });
    }
    async post(path, body, options) {
        return this.request(path, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined
        });
    }
}
const apiClient = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
class ApiError extends Error {
    kind;
    statusCode;
    details;
    constructor(message, kind, statusCode, details){
        super(message);
        this.name = 'ApiError';
        this.kind = kind;
        this.statusCode = statusCode;
        this.details = details;
    }
    static fromStatusCode(statusCode, detailMessage) {
        switch(statusCode){
            case 401:
                return new ApiError(detailMessage || 'Authentication required to access security backend.', 'UNAUTHORIZED', 401);
            case 403:
                return new ApiError(detailMessage || 'Insufficient permissions for this operation.', 'FORBIDDEN', 403);
            case 404:
                return new ApiError(detailMessage || 'Requested security resource not found.', 'NOT_FOUND', 404);
            case 422:
                return new ApiError(detailMessage || 'Invalid request payload or parameters.', 'VALIDATION_ERROR', 422);
            case 429:
                return new ApiError(detailMessage || 'Rate limit exceeded. Please try again later.', 'RATE_LIMITED', 429);
            default:
                if (statusCode >= 500) {
                    return new ApiError(detailMessage || 'Internal backend server error.', 'SERVER_ERROR', statusCode);
                }
                return new ApiError(detailMessage || `HTTP Request failed with status ${statusCode}`, 'SERVER_ERROR', statusCode);
        }
    }
    static networkError(originalError) {
        return new ApiError(`Unable to connect to Security Orchestrator backend API. ${originalError?.message || ''}`.trim(), 'NETWORK_ERROR');
    }
    static timeout() {
        return new ApiError('Backend API request timed out.', 'TIMEOUT');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/mappers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapAuditEvent",
    ()=>mapAuditEvent,
    "mapDashboardMetrics",
    ()=>mapDashboardMetrics,
    "mapFinding",
    ()=>mapFinding,
    "mapFindingStatus",
    ()=>mapFindingStatus,
    "mapFixability",
    ()=>mapFixability,
    "mapPRStatus",
    ()=>mapPRStatus,
    "mapPullRequest",
    ()=>mapPullRequest,
    "mapRemediation",
    ()=>mapRemediation,
    "mapRemediationStatus",
    ()=>mapRemediationStatus,
    "mapRepository",
    ()=>mapRepository,
    "mapSeverity",
    ()=>mapSeverity,
    "mapValidation",
    ()=>mapValidation,
    "mapValidationStep",
    ()=>mapValidationStep,
    "mapValidationStepStatus",
    ()=>mapValidationStepStatus
]);
function mapSeverity(severity) {
    const upper = (severity || '').toUpperCase();
    if (upper === 'CRITICAL') return 'CRITICAL';
    if (upper === 'HIGH') return 'HIGH';
    if (upper === 'MEDIUM') return 'MEDIUM';
    if (upper === 'LOW') return 'LOW';
    return 'INFO';
}
function mapFindingStatus(status) {
    const upper = (status || '').toUpperCase();
    const validStatuses = [
        'OPEN',
        'TRIAGED',
        'REMEDIATING',
        'VALIDATING',
        'VERIFIED',
        'FAILED',
        'HUMAN_REVIEW',
        'MERGED'
    ];
    if (validStatuses.includes(upper)) {
        return upper;
    }
    return 'OPEN';
}
function mapFixability(fixability) {
    const upper = (fixability || '').toUpperCase();
    if (upper === 'AUTO_REMEDIABLE' || upper === 'AUTO' || upper === 'AI_ASSISTED') {
        return 'AUTO_REMEDIABLE';
    }
    if (upper === 'REQUIRES_HUMAN_TRIAGE' || upper === 'HUMAN_ONLY') {
        return 'REQUIRES_HUMAN_TRIAGE';
    }
    return 'MANUAL_ONLY';
}
function mapFinding(dto) {
    return {
        id: dto.id,
        repository: dto.repository,
        pullRequest: dto.pullRequest || '',
        commitSha: dto.commitSha || '',
        tool: dto.tool || 'Scanner',
        ruleId: dto.ruleId || '',
        title: dto.title || dto.message || 'Security Finding',
        message: dto.message || '',
        severity: mapSeverity(dto.severity),
        confidence: typeof dto.confidence === 'number' ? dto.confidence <= 1 ? Math.round(dto.confidence * 100) : dto.confidence : 90,
        file: dto.file || '',
        startLine: Number(dto.startLine) || 1,
        endLine: Number(dto.endLine) || Number(dto.startLine) || 1,
        cwe: dto.cwe || 'CWE-Other',
        owasp: dto.owasp || 'A03:2021 - Injection',
        introducedByPR: dto.introducedByPR || dto.pullRequest || '',
        fixability: mapFixability(dto.fixability),
        status: mapFindingStatus(dto.status),
        evidence: {
            snippet: dto.evidence?.snippet || '',
            vulnerableLine: dto.evidence?.vulnerableLine || dto.evidence?.snippet || '',
            contextBefore: dto.evidence?.contextBefore || [],
            contextAfter: dto.evidence?.contextAfter || [],
            explanation: dto.evidence?.explanation || dto.message || ''
        }
    };
}
function mapRemediationStatus(status) {
    const upper = (status || '').toUpperCase();
    if (upper === 'PROPOSED' || upper === 'CANDIDATE') return 'CANDIDATE';
    if (upper === 'VALIDATING') return 'VALIDATING';
    if (upper === 'VALIDATED' || upper === 'VERIFIED') return 'VERIFIED';
    if (upper === 'REJECTED') return 'REJECTED';
    if (upper === 'PR_CREATED') return 'PR_CREATED';
    return 'CANDIDATE';
}
function mapRemediation(dto) {
    return {
        id: dto.id,
        findingId: dto.findingId,
        strategy: dto.strategy || 'Automated Patch',
        model: dto.model || 'Security LLM',
        confidence: typeof dto.confidence === 'number' ? dto.confidence <= 1 ? Math.round(dto.confidence * 100) : dto.confidence : 95,
        rootCause: dto.rootCause || '',
        patch: dto.patch || '',
        filesChanged: dto.filesChanged || [],
        testsAdded: dto.testsAdded || [],
        assumptions: dto.assumptions || [],
        risk: dto.risk?.toUpperCase() || 'LOW',
        status: mapRemediationStatus(dto.status)
    };
}
function mapValidationStepStatus(status) {
    const lower = (status || '').toLowerCase();
    if (lower === 'running') return 'running';
    if (lower === 'passed' || lower === 'success') return 'passed';
    if (lower === 'failed' || lower === 'error') return 'failed';
    if (lower === 'skipped') return 'skipped';
    return 'pending';
}
function mapValidationStep(dto) {
    return {
        id: dto.id,
        name: dto.name,
        status: mapValidationStepStatus(dto.status),
        command: dto.command,
        durationMs: dto.durationMs,
        logs: dto.logs,
        errorCount: dto.errorCount ?? 0
    };
}
function mapValidation(dto) {
    return {
        id: dto.id,
        remediationId: dto.remediationId,
        findingId: dto.findingId,
        steps: (dto.steps || []).map(mapValidationStep),
        overallStatus: mapValidationStepStatus(dto.overallStatus),
        startedAt: dto.startedAt || new Date().toISOString(),
        completedAt: dto.completedAt
    };
}
function mapPRStatus(status) {
    const upper = (status || '').toUpperCase();
    if (upper === 'OPEN') return 'OPEN';
    if (upper === 'VALIDATING') return 'VALIDATING';
    if (upper === 'READY_FOR_REVIEW') return 'READY_FOR_REVIEW';
    if (upper === 'APPROVED') return 'APPROVED';
    if (upper === 'MERGED') return 'MERGED';
    if (upper === 'CLOSED') return 'CLOSED';
    return 'OPEN';
}
function mapPullRequest(dto) {
    return {
        id: dto.id,
        number: dto.number,
        title: dto.title,
        repository: dto.repository,
        branch: dto.branch,
        targetBranch: dto.targetBranch || 'main',
        originalPR: dto.originalPR || '',
        remediationId: dto.remediationId,
        findingId: dto.findingId,
        status: mapPRStatus(dto.status),
        validationStatus: mapValidationStepStatus(dto.validationStatus),
        url: dto.url || '#',
        createdAt: dto.createdAt || new Date().toISOString(),
        updatedAt: dto.updatedAt || new Date().toISOString()
    };
}
function mapAuditEvent(dto) {
    return {
        id: dto.id,
        timestamp: dto.timestamp || new Date().toISOString(),
        actor: dto.actor || 'System',
        component: dto.component || 'SCANNER',
        action: dto.action || 'EVENT',
        status: dto.status || 'INFO',
        evidence: dto.evidence || {}
    };
}
function mapRepository(dto) {
    return {
        id: dto.id,
        name: dto.name,
        owner: dto.owner,
        defaultBranch: dto.defaultBranch || 'main',
        securityStatus: dto.securityStatus || 'COMPLIANT',
        openFindingsCount: dto.openFindingsCount ?? 0,
        criticalCount: dto.criticalCount ?? 0,
        highCount: dto.highCount ?? 0,
        mediumCount: dto.mediumCount ?? 0,
        lowCount: dto.lowCount ?? 0,
        lastScanAt: dto.lastScanAt || new Date().toISOString(),
        policy: dto.policy || 'Standard Security Policy'
    };
}
function mapDashboardMetrics(dto) {
    return {
        openFindings: dto.openFindings ?? 0,
        criticalCount: dto.criticalCount ?? 0,
        highCount: dto.highCount ?? 0,
        fixCandidates: dto.fixCandidates ?? 0,
        validationPassRate: dto.validationPassRate ?? 100,
        remediationPRs: dto.remediationPRs ?? 0
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/demo/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_AUDIT_EVENTS",
    ()=>INITIAL_AUDIT_EVENTS,
    "INITIAL_FINDINGS",
    ()=>INITIAL_FINDINGS,
    "INITIAL_METRICS",
    ()=>INITIAL_METRICS,
    "INITIAL_PULL_REQUESTS",
    ()=>INITIAL_PULL_REQUESTS,
    "INITIAL_REMEDIATIONS",
    ()=>INITIAL_REMEDIATIONS,
    "INITIAL_REPOSITORIES",
    ()=>INITIAL_REPOSITORIES,
    "INITIAL_VALIDATIONS",
    ()=>INITIAL_VALIDATIONS
]);
const INITIAL_REPOSITORIES = [
    {
        id: 'repo-1',
        name: 'payments-api',
        owner: 'acme-corp',
        defaultBranch: 'main',
        securityStatus: 'NEEDS_ATTENTION',
        openFindingsCount: 3,
        criticalCount: 0,
        highCount: 2,
        mediumCount: 1,
        lowCount: 0,
        lastScanAt: '4 minutes ago',
        policy: 'Production Strict'
    },
    {
        id: 'repo-2',
        name: 'auth-service',
        owner: 'acme-corp',
        defaultBranch: 'main',
        securityStatus: 'COMPLIANT',
        openFindingsCount: 0,
        criticalCount: 0,
        highCount: 0,
        mediumCount: 0,
        lowCount: 0,
        lastScanAt: '18 minutes ago',
        policy: 'Production Strict'
    },
    {
        id: 'repo-3',
        name: 'user-portal',
        owner: 'acme-corp',
        defaultBranch: 'main',
        securityStatus: 'NEEDS_ATTENTION',
        openFindingsCount: 2,
        criticalCount: 1,
        highCount: 0,
        mediumCount: 1,
        lowCount: 0,
        lastScanAt: '1 hour ago',
        policy: 'Standard CI'
    }
];
const INITIAL_FINDINGS = [
    {
        id: 'SEC-001',
        repository: 'payments-api',
        pullRequest: '#142',
        commitSha: 'a8f3b91c7e92',
        tool: 'Semgrep',
        ruleId: 'javascript.express.security.audit.sqli.express-sqli',
        title: 'SQL Injection in User Authentication Route',
        message: 'User input concatenated directly into SQL query string without parameterization.',
        severity: 'HIGH',
        confidence: 96,
        file: 'src/auth/login.js',
        startLine: 40,
        endLine: 44,
        cwe: 'CWE-89',
        owasp: 'A03:2021 - Injection',
        introducedByPR: '#142 (Add legacy authentication fallback)',
        fixability: 'AUTO_REMEDIABLE',
        status: 'OPEN',
        evidence: {
            snippet: `39: async function authenticateUser(userId, password) {
40:   // DANGEROUS: Concatenating untrusted user ID into SQL string
41:   const query =
42:     "SELECT * FROM users WHERE id = " + userId;
43:   const result = await db.query(query);
44:   return result.rows[0];
45: }`,
            vulnerableLine: '    "SELECT * FROM users WHERE id = " + userId;',
            contextBefore: [
                'async function authenticateUser(userId, password) {',
                '  // DANGEROUS: Concatenating untrusted user ID into SQL string'
            ],
            contextAfter: [
                '  const result = await db.query(query);',
                '  return result.rows[0];',
                '}'
            ],
            explanation: 'Constructing dynamic SQL queries via string concatenation allows malicious input to alter query logic, potentially bypassing authentication or leaking database tables.'
        }
    },
    {
        id: 'SEC-002',
        repository: 'user-portal',
        pullRequest: '#89',
        commitSha: '7c4d1e2f9b00',
        tool: 'Trivy',
        ruleId: 'CVE-2024-21626',
        title: 'Container Escape Vulnerability in Base Runtime',
        message: 'runc process leak via working directory file descriptor propagation.',
        severity: 'CRITICAL',
        confidence: 99,
        file: 'Dockerfile',
        startLine: 12,
        endLine: 12,
        cwe: 'CWE-403',
        owasp: 'A06:2021 - Vulnerable and Outdated Components',
        introducedByPR: '#89 (Upgrade container base image)',
        fixability: 'REQUIRES_HUMAN_TRIAGE',
        status: 'TRIAGED',
        evidence: {
            snippet: `10: FROM node:20-alpine
11: WORKDIR /app
12: COPY . .`,
            vulnerableLine: 'FROM node:20-alpine',
            contextBefore: [
                '# Base container setup'
            ],
            contextAfter: [
                'WORKDIR /app',
                'RUN npm ci'
            ],
            explanation: 'Base container runtime contains unpatched CVE vulnerability affecting container isolation boundary.'
        }
    },
    {
        id: 'SEC-003',
        repository: 'payments-api',
        pullRequest: '#142',
        commitSha: 'a8f3b91c7e92',
        tool: 'Gitleaks',
        ruleId: 'generic-api-key',
        title: 'Hardcoded Internal API Token',
        message: 'Potential secret string matching high-entropy API key token format found in code.',
        severity: 'MEDIUM',
        confidence: 88,
        file: 'src/config/gateway.js',
        startLine: 18,
        endLine: 18,
        cwe: 'CWE-798',
        owasp: 'A07:2021 - Identification and Authentication Failures',
        introducedByPR: '#142 (Add legacy authentication fallback)',
        fixability: 'AUTO_REMEDIABLE',
        status: 'OPEN',
        evidence: {
            snippet: `17: export const GATEWAY_CONFIG = {
18:   API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",
19: };`,
            vulnerableLine: '  API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",',
            contextBefore: [
                'export const GATEWAY_CONFIG = {'
            ],
            contextAfter: [
                '  TIMEOUT_MS: 5000',
                '};'
            ],
            explanation: 'Hardcoded secrets in repository commits are vulnerable to exposure across environments.'
        }
    }
];
const INITIAL_REMEDIATIONS = {
    'REM-SEC-001': {
        id: 'REM-SEC-001',
        findingId: 'SEC-001',
        strategy: 'Prepared SQL Statement Parameterization',
        model: 'Claude 3.5 Sonnet (Security fine-tuned)',
        confidence: 98,
        rootCause: 'Unsanitized string concatenation of user-supplied `userId` parameter directly into SQL execution string.',
        patch: `--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -40,4 +40,4 @@ async function authenticateUser(userId, password) {
-  const query =
-    "SELECT * FROM users WHERE id = " + userId;
-  const result = await db.query(query);
+  const query = "SELECT * FROM users WHERE id = ?";
+  const result = await db.query(query, [userId]);
--- a/tests/auth/login.test.js
+++ b/tests/auth/login.test.js
@@ -15,0 +16,6 @@
+  test("should parameterize userId SQL query safely", async () => {
+    const mockDb = { query: vi.fn().mockResolvedValue({ rows: [{ id: 1 }] }) };
+    await authenticateUser("1 OR 1=1", "pass", mockDb);
+    expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = ?", ["1 OR 1=1"]);
+  });`,
        filesChanged: [
            'src/auth/login.js',
            'tests/auth/login.test.js'
        ],
        testsAdded: [
            'tests/auth/login.test.js:16 (Parameterization injection test)'
        ],
        assumptions: [
            'Database driver `db.query` supports array parameter bindings as standard second argument.',
            '`userId` format validation remains handled upstream or via database type checking.'
        ],
        risk: 'LOW',
        status: 'CANDIDATE'
    }
};
const INITIAL_VALIDATIONS = {
    'VAL-SEC-001': {
        id: 'VAL-SEC-001',
        remediationId: 'REM-SEC-001',
        findingId: 'SEC-001',
        overallStatus: 'pending',
        startedAt: new Date(Date.now() - 300000).toISOString(),
        steps: [
            {
                id: 'step-1',
                name: 'Patch Scope',
                status: 'pending',
                command: 'git diff --stat',
                logs: [
                    'Verifying patch boundary...',
                    'Patch affects 2 files (+7, -3 lines)'
                ]
            },
            {
                id: 'step-2',
                name: 'Formatter',
                status: 'pending',
                command: 'npx prettier --check .',
                logs: [
                    'Checking code formatting compliance...'
                ]
            },
            {
                id: 'step-3',
                name: 'Linter',
                status: 'pending',
                command: 'npx eslint src/auth/login.js',
                logs: [
                    'Running ESLint rules...'
                ]
            },
            {
                id: 'step-4',
                name: 'Type Check',
                status: 'pending',
                command: 'npx tsc --noEmit',
                logs: [
                    'Executing TypeScript type diagnostics...'
                ]
            },
            {
                id: 'step-5',
                name: 'Unit Tests',
                status: 'pending',
                command: 'npx vitest run tests/auth/login.test.js',
                logs: [
                    'Running unit test suite...'
                ]
            },
            {
                id: 'step-6',
                name: 'Integration Tests',
                status: 'pending',
                command: 'npm run test:integration',
                logs: [
                    'Spinning up test DB container...'
                ]
            },
            {
                id: 'step-7',
                name: 'Build Verification',
                status: 'pending',
                command: 'npm run build',
                logs: [
                    'Compiling production bundle...'
                ]
            },
            {
                id: 'step-8',
                name: 'Security Re-scan',
                status: 'pending',
                command: 'semgrep --config p/security-audit src/auth/login.js',
                logs: [
                    'Re-executing Semgrep rule SEC-001...'
                ]
            },
            {
                id: 'step-9',
                name: 'Finding Comparison',
                status: 'pending',
                command: 'orchestrator-cli diff-findings',
                logs: [
                    'Comparing pre-patch vs post-patch security findings...'
                ]
            }
        ]
    }
};
const INITIAL_PULL_REQUESTS = [
    {
        id: 'PR-157',
        number: 157,
        title: 'security: remediate SEC-001 SQL Injection in login auth handler',
        repository: 'payments-api',
        branch: 'security/fix-sec-001-sql-injection',
        targetBranch: 'main',
        originalPR: '#142',
        remediationId: 'REM-SEC-001',
        findingId: 'SEC-001',
        status: 'OPEN',
        validationStatus: 'pending',
        url: 'https://github.com/acme-corp/payments-api/pull/157',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
const INITIAL_AUDIT_EVENTS = [
    {
        id: 'AUD-001',
        timestamp: '2026-09-18 20:14:02 UTC',
        actor: 'GitHub App Webhook',
        component: 'SCANNER',
        action: 'PR_SCAN_TRIGGERED',
        status: 'INFO',
        evidence: {
            repository: 'payments-api',
            prNumber: 142,
            sha: 'a8f3b91c7e92',
            trigger: 'synchronize'
        }
    },
    {
        id: 'AUD-002',
        timestamp: '2026-09-18 20:14:15 UTC',
        actor: 'Semgrep SAST Engine v1.62',
        component: 'SCANNER',
        action: 'FINDING_DETECTED',
        status: 'WARNING',
        evidence: {
            findingId: 'SEC-001',
            rule: 'javascript.express.security.audit.sqli',
            file: 'src/auth/login.js',
            line: 42,
            severity: 'HIGH'
        }
    },
    {
        id: 'AUD-003',
        timestamp: '2026-09-18 20:14:18 UTC',
        actor: 'Security Policy Evaluator',
        component: 'POLICY_ENGINE',
        action: 'TRIAGE_EVALUATED',
        status: 'SUCCESS',
        evidence: {
            findingId: 'SEC-001',
            policy: 'Production Strict',
            decision: 'AUTO_REMEDIATION_ELIGIBLE'
        }
    }
];
const INITIAL_METRICS = {
    openFindings: 3,
    criticalCount: 1,
    highCount: 2,
    fixCandidates: 1,
    validationPassRate: 98.5,
    remediationPRs: 1
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/demo/state.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "demoStore",
    ()=>demoStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo/data.ts [app-client] (ecmascript)");
;
class DemoStore {
    repositories = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_REPOSITORIES"]
    ];
    findings = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_FINDINGS"]
    ];
    remediations = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_REMEDIATIONS"]
    };
    validations = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_VALIDATIONS"]
    };
    pullRequests = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_PULL_REQUESTS"]
    ];
    auditEvents = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_AUDIT_EVENTS"]
    ];
    metrics = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_METRICS"]
    };
    listeners = new Set();
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((l)=>l());
    }
    // Getters
    getRepositories() {
        return this.repositories;
    }
    getRepositoryByName(name) {
        return this.repositories.find((r)=>r.name.toLowerCase() === name.toLowerCase());
    }
    getFindings() {
        return this.findings;
    }
    getFindingById(id) {
        return this.findings.find((f)=>f.id === id);
    }
    getRemediationByFindingId(findingId) {
        return Object.values(this.remediations).find((r)=>r.findingId === findingId);
    }
    getRemediationById(id) {
        return this.remediations[id];
    }
    getValidationByRemediationId(remediationId) {
        return Object.values(this.validations).find((v)=>v.remediationId === remediationId);
    }
    getValidationById(id) {
        return this.validations[id];
    }
    getPullRequests() {
        return this.pullRequests;
    }
    getPullRequestById(id) {
        return this.pullRequests.find((pr)=>pr.id === id || pr.number.toString() === id);
    }
    getAuditEvents() {
        return this.auditEvents;
    }
    getMetrics() {
        return this.metrics;
    }
    // Stateful Workflow Actions
    startRemediation(findingId) {
        const finding = this.getFindingById(findingId);
        if (finding) {
            finding.status = 'REMEDIATING';
        }
        let remediation = this.getRemediationByFindingId(findingId);
        if (!remediation) {
            const remId = `REM-${findingId}`;
            remediation = {
                id: remId,
                findingId,
                strategy: 'Context-Aware Input Sanitization & Parameterization',
                model: 'Claude 3.5 Sonnet (Security fine-tuned)',
                confidence: 96,
                rootCause: `Vulnerable string interpolation in ${finding?.file ?? 'source code'}.`,
                patch: `--- a/${finding?.file}\n+++ b/${finding?.file}\n@@ -${finding?.startLine},3 +${finding?.startLine},3 @@\n- ${finding?.evidence.vulnerableLine}\n+ // Remediated: Parameterized query binding\n+ const safeQuery = sanitizeInput(${finding?.evidence.vulnerableLine});`,
                filesChanged: [
                    finding?.file ?? 'src/index.js'
                ],
                testsAdded: [
                    `tests/${finding?.file}.test.js`
                ],
                assumptions: [
                    'Database interface supports parameterized bindings.'
                ],
                risk: 'LOW',
                status: 'CANDIDATE'
            };
            this.remediations[remId] = remediation;
        }
        this.addAuditEvent({
            id: `AUD-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            actor: 'Pre-Prod Remediation Engine',
            component: 'REMEDIATION_ENGINE',
            action: 'REMEDIATION_CANDIDATE_GENERATED',
            status: 'SUCCESS',
            evidence: {
                findingId,
                remediationId: remediation.id,
                model: remediation.model,
                confidence: remediation.confidence
            }
        });
        this.notify();
        return remediation;
    }
    runValidationSimulation(validationId, onStepUpdate) {
        const val = this.getValidationById(validationId);
        if (!val) throw new Error('Validation record not found');
        val.overallStatus = 'running';
        val.startedAt = new Date().toISOString();
        this.notify();
        return new Promise((resolve)=>{
            let stepIndex = 0;
            const interval = setInterval(()=>{
                if (stepIndex < val.steps.length) {
                    const step = val.steps[stepIndex];
                    step.status = 'passed';
                    step.durationMs = Math.floor(Math.random() * 400) + 150;
                    if (onStepUpdate) onStepUpdate(step.id, 'passed');
                    stepIndex++;
                    this.notify();
                } else {
                    clearInterval(interval);
                    val.overallStatus = 'passed';
                    val.completedAt = new Date().toISOString();
                    // Update related Remediation and Finding status
                    const remediation = this.getRemediationById(val.remediationId);
                    if (remediation) {
                        remediation.status = 'VERIFIED';
                    }
                    const finding = this.getFindingById(val.findingId);
                    if (finding) {
                        finding.status = 'VERIFIED';
                    }
                    // Update related PR
                    const pr = this.pullRequests.find((p)=>p.remediationId === val.remediationId);
                    if (pr) {
                        pr.status = 'READY_FOR_REVIEW';
                        pr.validationStatus = 'passed';
                    }
                    this.addAuditEvent({
                        id: `AUD-${Date.now()}`,
                        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
                        actor: 'Pre-Prod Validation Pipeline',
                        component: 'VALIDATOR',
                        action: 'VALIDATION_PIPELINE_VERIFIED',
                        status: 'SUCCESS',
                        evidence: {
                            validationId,
                            totalStepsPassed: val.steps.length,
                            securityRescanPassed: true
                        }
                    });
                    this.notify();
                    resolve(val);
                }
            }, 400);
        });
    }
    addAuditEvent(event) {
        this.auditEvents.unshift(event);
        this.notify();
    }
    resetState() {
        this.repositories = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_REPOSITORIES"]));
        this.findings = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_FINDINGS"]));
        this.remediations = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_REMEDIATIONS"]));
        this.validations = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_VALIDATIONS"]));
        this.pullRequests = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_PULL_REQUESTS"]));
        this.auditEvents = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_AUDIT_EVENTS"]));
        this.metrics = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_METRICS"]));
        this.notify();
    }
}
const demoStore = new DemoStore();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mode/modeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppModeProvider",
    ()=>AppModeProvider,
    "useAppMode",
    ()=>useAppMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/orchestrator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo/state.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const AppModeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    mode: 'normal',
    setMode: ()=>{},
    isDemoMode: false
});
const STORAGE_KEY = 'preprod_orchestrator_app_mode';
function getInitialMode() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const savedMode = localStorage.getItem(STORAGE_KEY);
        if (savedMode === 'demo' || savedMode === 'normal') {
            return savedMode;
        }
    } catch  {
    // Ignore storage errors
    }
    return 'normal';
}
function AppModeProvider({ children }) {
    _s();
    const [mode, setModeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AppModeProvider.useState": ()=>{
            const initial = getInitialMode();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].setMode(initial);
            if (initial === 'demo') {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].resetState();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].reset();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].stop();
            }
            return initial;
        }
    }["AppModeProvider.useState"]);
    const handleSetMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppModeProvider.useCallback[handleSetMode]": (newMode)=>{
            if (newMode === 'normal') {
                // 1. Stop simulator engine & cancel all active timers
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].stop();
                // 2. Clear & reset demo store state so it stays isolated
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].resetState();
                // 3. Switch orchestrator service data adapter to Normal mode
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].setMode('normal');
            } else if (newMode === 'demo') {
                // 1. Reset demo store to deterministic clean initial state
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].resetState();
                // 2. Initialize simulator engine cleanly
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulatorEngine"].reset();
                // 3. Switch orchestrator service data adapter to Demo mode
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$orchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orchestratorService"].setMode('demo');
            }
            setModeState(newMode);
            try {
                localStorage.setItem(STORAGE_KEY, newMode);
            } catch  {
            // Ignore storage errors in restricted contexts
            }
        }
    }["AppModeProvider.useCallback[handleSetMode]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppModeContext.Provider, {
        value: {
            mode,
            setMode: handleSetMode,
            isDemoMode: mode === 'demo'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/mode/modeContext.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(AppModeProvider, "WTycZjILIu2IpaDhEfC+1NYZVfI=");
_c = AppModeProvider;
function useAppMode() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppModeContext);
    if (!context) {
        throw new Error('useAppMode must be used within an AppModeProvider');
    }
    return context;
}
_s1(useAppMode, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppModeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/orchestrator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrchestratorService",
    ()=>OrchestratorService,
    "orchestratorService",
    ()=>orchestratorService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$demoAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/adapters/demoAdapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$apiAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/adapters/apiAdapter.ts [app-client] (ecmascript)");
;
;
class OrchestratorService {
    mode = 'normal';
    listeners = new Set();
    unsubscribeDemo = null;
    unsubscribeApi = null;
    constructor(){
        this.unsubscribeDemo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$demoAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoAdapter"].subscribe ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$demoAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoAdapter"].subscribe(()=>this.notify()) : null;
        this.unsubscribeApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$apiAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiAdapter"].subscribe ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$apiAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiAdapter"].subscribe(()=>this.notify()) : null;
    }
    getMode() {
        return this.mode;
    }
    setMode(mode) {
        if (this.mode !== mode) {
            this.mode = mode;
            this.notify();
        }
    }
    isDemoMode() {
        return this.mode === 'demo';
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    notify() {
        this.listeners.forEach((l)=>l());
    }
    get activeAdapter() {
        return this.mode === 'demo' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$demoAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoAdapter"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$apiAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiAdapter"];
    }
    async getMetrics() {
        return this.activeAdapter.getMetrics();
    }
    async getRepositories() {
        return this.activeAdapter.getRepositories();
    }
    async getRepositoryByName(name) {
        return this.activeAdapter.getRepositoryByName(name);
    }
    async getFindings() {
        return this.activeAdapter.getFindings();
    }
    async getFindingById(id) {
        return this.activeAdapter.getFindingById(id);
    }
    async getRemediationByFindingId(findingId) {
        return this.activeAdapter.getRemediationByFindingId(findingId);
    }
    async getRemediationById(id) {
        return this.activeAdapter.getRemediationById(id);
    }
    async getValidationByRemediationId(remediationId) {
        return this.activeAdapter.getValidationByRemediationId(remediationId);
    }
    async getValidationById(id) {
        return this.activeAdapter.getValidationById(id);
    }
    async getPullRequests() {
        return this.activeAdapter.getPullRequests();
    }
    async getPullRequestById(id) {
        return this.activeAdapter.getPullRequestById(id);
    }
    async getAuditEvents() {
        return this.activeAdapter.getAuditEvents();
    }
    async startRemediation(findingId) {
        return this.activeAdapter.startRemediation(findingId);
    }
    async runValidation(validationId, onStepUpdate) {
        return this.activeAdapter.runValidation(validationId, onStepUpdate);
    }
    async resetDemoData() {
        if (this.mode === 'demo') {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$demoAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoAdapter"].resetState();
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$adapters$2f$apiAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiAdapter"].resetState();
        }
    }
}
const orchestratorService = new OrchestratorService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/simulator/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_TIMINGS",
    ()=>DEMO_TIMINGS,
    "simulatorEngine",
    ()=>simulatorEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$scenarios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulator/scenarios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/demo/state.ts [app-client] (ecmascript)");
;
;
const DEMO_TIMINGS = {
    PR_OPENED: 1000,
    SCANNING: 2500,
    FINDING_DETECTED: 1500,
    TRIAGED: 1200,
    REMEDIATION_STARTED: 2500,
    PATCH_GENERATED: 1500,
    VALIDATING: 3500,
    VALIDATION_PASSED: 1200,
    RESCAN_PASSED: 1500,
    VERIFIED: 1200,
    PR_CREATED: 1500,
    HUMAN_REVIEW: 1500,
    MERGED: 1000,
    VALIDATION_FAILED: 0,
    RESCAN_FAILED: 0,
    REMEDIATION_FAILED: 0,
    ROTATION_REQUIRED: 0
};
class SimulatorEngine {
    activeScenario = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$scenarios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCENARIO_SQL_INJECTION"];
    currentStateIndex = 0;
    isRunning = false;
    isPaused = false;
    speedMultiplier = 1.0;
    timerId = null;
    generationId = 0;
    listeners = new Set();
    constructor(){
        this.syncScenarioToStore();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((l)=>l());
    }
    getStatus() {
        const states = this.activeScenario.statesSequence;
        const currentState = states[this.currentStateIndex] || states[0];
        const isFailed = currentState.includes('FAILED') || currentState === 'ROTATION_REQUIRED';
        const isCompleted = currentState === 'MERGED' || this.currentStateIndex >= states.length - 1;
        return {
            activeScenario: this.activeScenario,
            currentState,
            stateIndex: this.currentStateIndex,
            totalStates: states.length,
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            isCompleted,
            isFailed,
            speedMultiplier: this.speedMultiplier
        };
    }
    setScenario(scenarioId) {
        const found = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulator$2f$scenarios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_SCENARIOS"].find((s)=>s.id === scenarioId);
        if (!found) return;
        this.reset();
        this.activeScenario = found;
        this.syncScenarioToStore();
        this.notify();
    }
    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
        this.notify();
    }
    start() {
        if (this.isRunning && !this.isPaused) return;
        if (this.isPaused) {
            this.isPaused = false;
            this.isRunning = true;
            this.scheduleNextStep();
            this.notify();
            return;
        }
        this.reset();
        this.isRunning = true;
        this.isPaused = false;
        this.scheduleNextStep();
        this.notify();
    }
    pause() {
        if (!this.isRunning || this.isPaused) return;
        this.clearTimer();
        this.isPaused = true;
        this.notify();
    }
    resume() {
        if (!this.isRunning || !this.isPaused) return;
        this.isPaused = false;
        this.scheduleNextStep();
        this.notify();
    }
    reset() {
        this.clearTimer();
        this.generationId++;
        this.currentStateIndex = 0;
        this.isRunning = false;
        this.isPaused = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].resetState();
        this.syncScenarioToStore();
        this.notify();
    }
    stop() {
        this.clearTimer();
        this.generationId++;
        this.currentStateIndex = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.notify();
    }
    nextStep() {
        const states = this.activeScenario.statesSequence;
        if (this.currentStateIndex >= states.length - 1) return;
        const nextIndex = this.currentStateIndex + 1;
        this.transitionToState(nextIndex);
    }
    retry() {
        const status = this.getStatus();
        if (!status.isFailed) return;
        // Restart validation step sequence from VALIDATING state
        const validatingIndex = this.activeScenario.statesSequence.indexOf('VALIDATING');
        if (validatingIndex !== -1) {
            this.transitionToState(validatingIndex);
            this.start();
        } else {
            this.reset();
            this.start();
        }
    }
    fastForward() {
        this.clearTimer();
        const states = this.activeScenario.statesSequence;
        this.transitionToState(states.length - 1);
        this.isRunning = false;
        this.isPaused = false;
    }
    scheduleNextStep() {
        this.clearTimer();
        const currentGen = this.generationId;
        const states = this.activeScenario.statesSequence;
        if (this.currentStateIndex >= states.length - 1) {
            this.isRunning = false;
            this.notify();
            return;
        }
        const currentState = states[this.currentStateIndex];
        const delay = (DEMO_TIMINGS[currentState] ?? 1500) / this.speedMultiplier;
        if (delay === 0) {
            this.isRunning = false;
            this.notify();
            return;
        }
        this.timerId = setTimeout(()=>{
            if (currentGen !== this.generationId || !this.isRunning || this.isPaused) return;
            this.currentStateIndex++;
            this.transitionToState(this.currentStateIndex);
            this.scheduleNextStep();
        }, delay);
    }
    transitionToState(index) {
        const states = this.activeScenario.statesSequence;
        if (index < 0 || index >= states.length) return;
        const targetState = states[index];
        this.currentStateIndex = index;
        // Apply Domain State mutation to demoStore
        this.applyStateToDemoStore(targetState);
        this.notify();
    }
    applyStateToDemoStore(state) {
        const scenario = this.activeScenario;
        const finding = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getFindingById(scenario.findingId);
        // Update Finding Status
        if (finding) {
            if (state === 'SCANNING') finding.status = 'OPEN';
            if (state === 'TRIAGED') finding.status = 'TRIAGED';
            if (state === 'REMEDIATION_STARTED') finding.status = 'REMEDIATING';
            if (state === 'VALIDATING') finding.status = 'VALIDATING';
            if (state === 'VERIFIED' || state === 'MERGED') finding.status = 'VERIFIED';
            if (state === 'VALIDATION_FAILED' || state === 'RESCAN_FAILED') finding.status = 'FAILED';
        }
        // Update Validation Pipeline Steps
        const val = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getValidationByRemediationId(scenario.remediation?.id || '');
        if (val) {
            if (state === 'VALIDATING') {
                val.overallStatus = 'running';
                val.steps.forEach((step, idx)=>{
                    step.status = idx < 3 ? 'passed' : 'running';
                });
            }
            if (state === 'VALIDATION_PASSED' || state === 'RESCAN_PASSED' || state === 'VERIFIED') {
                val.overallStatus = 'passed';
                val.steps.forEach((step)=>{
                    if (step.status !== 'failed') step.status = 'passed';
                });
            }
            if (state === 'VALIDATION_FAILED') {
                val.overallStatus = 'failed';
                val.steps.forEach((step)=>{
                    if (step.id === 'step-5') step.status = 'failed';
                });
            }
        }
        // Update Remediation PR Status
        const pr = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getPullRequests().find((p)=>p.findingId === scenario.findingId);
        if (pr) {
            if (state === 'PR_CREATED') pr.status = 'OPEN';
            if (state === 'HUMAN_REVIEW') pr.status = 'READY_FOR_REVIEW';
            if (state === 'MERGED') pr.status = 'MERGED';
        }
        // Append Audit Event
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].addAuditEvent({
            id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            actor: 'Demo Simulator Engine',
            component: 'SIMULATOR',
            action: `WORKFLOW_STATE_${state}`,
            status: state.includes('FAILED') ? 'WARNING' : 'SUCCESS',
            evidence: {
                scenarioId: scenario.id,
                state,
                target: scenario.findingId
            }
        });
    }
    syncScenarioToStore() {
        if (this.activeScenario.finding) {
            const existing = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getFindingById(this.activeScenario.findingId);
            if (!existing) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$demo$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoStore"].getFindings().unshift(this.activeScenario.finding);
            }
        }
    }
    clearTimer() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}
const simulatorEngine = new SimulatorEngine();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/simulator/scenarios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SCENARIOS",
    ()=>ALL_SCENARIOS,
    "SCENARIO_DEPENDENCY_VULN",
    ()=>SCENARIO_DEPENDENCY_VULN,
    "SCENARIO_SECRET_LEAK",
    ()=>SCENARIO_SECRET_LEAK,
    "SCENARIO_SQL_INJECTION",
    ()=>SCENARIO_SQL_INJECTION,
    "SCENARIO_VALIDATION_FAILURE",
    ()=>SCENARIO_VALIDATION_FAILURE
]);
const SCENARIO_SQL_INJECTION = {
    id: 'sql-injection',
    name: 'SQL Injection Remediation (Golden Path)',
    description: 'Automated parameterization patch for SQL injection vulnerability in payments-api authentication handler.',
    repository: 'payments-api',
    prNumber: '#142',
    findingId: 'SEC-001',
    initialState: 'PR_OPENED',
    statesSequence: [
        'PR_OPENED',
        'SCANNING',
        'FINDING_DETECTED',
        'TRIAGED',
        'REMEDIATION_STARTED',
        'PATCH_GENERATED',
        'VALIDATING',
        'VALIDATION_PASSED',
        'RESCAN_PASSED',
        'VERIFIED',
        'PR_CREATED',
        'HUMAN_REVIEW',
        'MERGED'
    ],
    finding: {
        id: 'SEC-001',
        repository: 'payments-api',
        pullRequest: '#142',
        commitSha: 'a8f3b91c7e92',
        tool: 'Semgrep SAST',
        ruleId: 'javascript.express.security.audit.sqli',
        title: 'SQL Injection in User Authentication Route',
        message: 'User input concatenated directly into SQL query string without parameterization.',
        severity: 'HIGH',
        confidence: 96,
        file: 'src/auth/login.js',
        startLine: 40,
        endLine: 44,
        cwe: 'CWE-89',
        owasp: 'A03:2021 - Injection',
        introducedByPR: '#142 (Add legacy authentication fallback)',
        fixability: 'AUTO_REMEDIABLE',
        status: 'OPEN',
        evidence: {
            snippet: `39: async function authenticateUser(userId, password) {
40:   // DANGEROUS: Concatenating untrusted user ID into SQL string
41:   const query =
42:     "SELECT * FROM users WHERE id = " + userId;
43:   const result = await db.query(query);
44:   return result.rows[0];
45: }`,
            vulnerableLine: '    "SELECT * FROM users WHERE id = " + userId;',
            contextBefore: [
                'async function authenticateUser(userId, password) {',
                '  // DANGEROUS: Concatenating untrusted user ID into SQL string'
            ],
            contextAfter: [
                '  const result = await db.query(query);',
                '  return result.rows[0];',
                '}'
            ],
            explanation: 'Constructing dynamic SQL queries via string concatenation allows malicious input to alter query logic, potentially bypassing authentication or leaking database tables.'
        }
    },
    remediation: {
        id: 'REM-SEC-001',
        findingId: 'SEC-001',
        strategy: 'Prepared SQL Statement Parameterization',
        model: 'Claude 3.5 Sonnet (Security fine-tuned)',
        confidence: 98,
        rootCause: 'Unsanitized string concatenation of user-supplied `userId` parameter directly into SQL execution string.',
        patch: `--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -40,4 +40,4 @@ async function authenticateUser(userId, password) {
-  const query =
-    "SELECT * FROM users WHERE id = " + userId;
-  const result = await db.query(query);
+  const query = "SELECT * FROM users WHERE id = ?";
+  const result = await db.query(query, [userId]);
--- a/tests/auth/login.test.js
+++ b/tests/auth/login.test.js
@@ -15,0 +16,6 @@
+  test("should parameterize userId SQL query safely", async () => {
+    const mockDb = { query: vi.fn().mockResolvedValue({ rows: [{ id: 1 }] }) };
+    await authenticateUser("1 OR 1=1", "pass", mockDb);
+    expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = ?", ["1 OR 1=1"]);
+  });`,
        filesChanged: [
            'src/auth/login.js',
            'tests/auth/login.test.js'
        ],
        testsAdded: [
            'tests/auth/login.test.js:16 (Parameterization injection test)'
        ],
        assumptions: [
            'Database driver supports array parameter bindings.',
            'userId format validation handled upstream.'
        ],
        risk: 'LOW',
        status: 'CANDIDATE'
    },
    validation: {
        id: 'VAL-SEC-001',
        remediationId: 'REM-SEC-001',
        findingId: 'SEC-001',
        overallStatus: 'pending',
        startedAt: new Date().toISOString(),
        steps: [
            {
                id: 'step-1',
                name: 'Patch Scope',
                status: 'pending',
                command: 'git diff --stat',
                logs: [
                    'Verifying patch boundary...',
                    'Patch affects 2 files (+7, -3 lines)'
                ]
            },
            {
                id: 'step-2',
                name: 'Formatter',
                status: 'pending',
                command: 'npx prettier --check .',
                logs: [
                    '[SIMULATED RESULT] Code formatting compliant.'
                ]
            },
            {
                id: 'step-3',
                name: 'Linter',
                status: 'pending',
                command: 'npx eslint src/auth/login.js',
                logs: [
                    '[SIMULATED RESULT] ESLint passed with 0 errors.'
                ]
            },
            {
                id: 'step-4',
                name: 'Type Check',
                status: 'pending',
                command: 'npx tsc --noEmit',
                logs: [
                    '[SIMULATED RESULT] TypeScript check passed with 0 errors.'
                ]
            },
            {
                id: 'step-5',
                name: 'Unit Tests',
                status: 'pending',
                command: 'npx vitest run tests/auth/login.test.js',
                logs: [
                    '[SIMULATED RESULT] 128 tests passed.'
                ]
            },
            {
                id: 'step-6',
                name: 'Integration Tests',
                status: 'pending',
                command: 'npm run test:integration',
                logs: [
                    '[SIMULATED RESULT] DB container integration test passed.'
                ]
            },
            {
                id: 'step-7',
                name: 'Build Verification',
                status: 'pending',
                command: 'npm run build',
                logs: [
                    '[SIMULATED RESULT] Next.js production build succeeded.'
                ]
            },
            {
                id: 'step-8',
                name: 'Security Re-scan',
                status: 'pending',
                command: 'semgrep --config p/security-audit src/auth/login.js',
                logs: [
                    '[SIMULATED RESULT] Re-scanning src/auth/login.js...',
                    'Finding SEC-001 NOT DETECTED.'
                ]
            },
            {
                id: 'step-9',
                name: 'Finding Comparison',
                status: 'pending',
                command: 'orchestrator-cli diff-findings',
                logs: [
                    '[SIMULATED RESULT] Security Delta: 1 resolved, 0 new introduced.'
                ]
            }
        ]
    },
    pullRequest: {
        id: 'PR-157',
        number: 157,
        title: 'security: remediate SEC-001 SQL Injection in login auth handler',
        repository: 'payments-api',
        branch: 'security/fix-sec-001-sql-injection',
        targetBranch: 'main',
        originalPR: '#142',
        remediationId: 'REM-SEC-001',
        findingId: 'SEC-001',
        status: 'OPEN',
        validationStatus: 'pending',
        url: 'https://github.com/acme-corp/payments-api/pull/157',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    securityDelta: {
        beforeFindingCount: 3,
        afterFindingCount: 2,
        resolvedFindingId: 'SEC-001',
        newRisksIntroduced: 0
    }
};
const SCENARIO_VALIDATION_FAILURE = {
    ...SCENARIO_SQL_INJECTION,
    id: 'validation-failure',
    name: 'Validation Failure Scenario',
    description: 'Simulates a candidate patch failing unit test assertion step, halting auto-remediation for human intervention.',
    statesSequence: [
        'PR_OPENED',
        'SCANNING',
        'FINDING_DETECTED',
        'TRIAGED',
        'REMEDIATION_STARTED',
        'PATCH_GENERATED',
        'VALIDATING',
        'VALIDATION_FAILED'
    ],
    validation: {
        ...SCENARIO_SQL_INJECTION.validation,
        id: 'VAL-FAIL-001',
        steps: SCENARIO_SQL_INJECTION.validation.steps.map((step)=>{
            if (step.id === 'step-5') {
                return {
                    ...step,
                    status: 'failed',
                    logs: [
                        '[SIMULATED RESULT] Executing unit test suite...',
                        'FAIL tests/auth/login.test.js > authenticateUser > parameterization binding',
                        'Error: Expected mockDb.query parameter array to match [userId] but received undefined',
                        '1 test failed, 127 tests passed.'
                    ]
                };
            }
            return step;
        })
    }
};
const SCENARIO_SECRET_LEAK = {
    id: 'secret-leak',
    name: 'Secret Leak Scenario (Credential Rotation Required)',
    description: 'Detects hardcoded API key exposure and routes to credential rotation & git history purge workflow.',
    repository: 'payments-api',
    prNumber: '#142',
    findingId: 'SEC-003',
    initialState: 'PR_OPENED',
    statesSequence: [
        'PR_OPENED',
        'SCANNING',
        'FINDING_DETECTED',
        'TRIAGED',
        'ROTATION_REQUIRED',
        'HUMAN_REVIEW',
        'MERGED'
    ],
    finding: {
        id: 'SEC-003',
        repository: 'payments-api',
        pullRequest: '#142',
        commitSha: 'a8f3b91c7e92',
        tool: 'Gitleaks Secret Scanner',
        ruleId: 'generic-api-key',
        title: 'Hardcoded Internal API Token Exposure',
        message: 'High-entropy API key token format found in source file commit diff.',
        severity: 'HIGH',
        confidence: 99,
        file: 'src/config/gateway.js',
        startLine: 18,
        endLine: 18,
        cwe: 'CWE-798',
        owasp: 'A07:2021 - Identification Failures',
        introducedByPR: '#142 (Add legacy fallback)',
        fixability: 'REQUIRES_HUMAN_TRIAGE',
        status: 'OPEN',
        evidence: {
            snippet: `17: export const GATEWAY_CONFIG = {
18:   API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",
19: };`,
            vulnerableLine: '  API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",',
            contextBefore: [
                'export const GATEWAY_CONFIG = {'
            ],
            contextAfter: [
                '  TIMEOUT_MS: 5000',
                '};'
            ],
            explanation: 'Hardcoded credentials exposed in repository history must be revoked and rotated immediately.'
        }
    },
    validation: {
        id: 'VAL-SECRET-001',
        remediationId: 'REM-SECRET-001',
        findingId: 'SEC-003',
        overallStatus: 'pending',
        startedAt: new Date().toISOString(),
        steps: [
            {
                id: 'step-1',
                name: 'Secret Revocation Check',
                status: 'pending',
                command: 'vault token revoke sk_test_...',
                logs: [
                    '[SIMULATED RESULT] Revoking exposed credential token in Vault...'
                ]
            },
            {
                id: 'step-2',
                name: 'Git History Audit',
                status: 'pending',
                command: 'gitleaks detect --log-level debug',
                logs: [
                    '[SIMULATED RESULT] Verifying secret purged from commit history.'
                ]
            }
        ]
    },
    securityDelta: {
        beforeFindingCount: 3,
        afterFindingCount: 2,
        resolvedFindingId: 'SEC-003',
        newRisksIntroduced: 0
    }
};
const SCENARIO_DEPENDENCY_VULN = {
    id: 'dependency-vuln',
    name: 'Dependency CVE Upgrade Scenario',
    description: 'Upgrades vulnerable base runtime container package to patched CVE version.',
    repository: 'user-portal',
    prNumber: '#89',
    findingId: 'SEC-002',
    initialState: 'PR_OPENED',
    statesSequence: [
        'PR_OPENED',
        'SCANNING',
        'FINDING_DETECTED',
        'TRIAGED',
        'REMEDIATION_STARTED',
        'PATCH_GENERATED',
        'VALIDATING',
        'VALIDATION_PASSED',
        'RESCAN_PASSED',
        'VERIFIED',
        'PR_CREATED',
        'HUMAN_REVIEW',
        'MERGED'
    ],
    finding: {
        id: 'SEC-002',
        repository: 'user-portal',
        pullRequest: '#89',
        commitSha: '7c4d1e2f9b00',
        tool: 'Trivy Vulnerability Scanner',
        ruleId: 'CVE-2024-21626',
        title: 'Container Escape Vulnerability in Base Image',
        message: 'runc process leak via working directory file descriptor propagation.',
        severity: 'CRITICAL',
        confidence: 99,
        file: 'Dockerfile',
        startLine: 10,
        endLine: 10,
        cwe: 'CWE-403',
        owasp: 'A06:2021 - Vulnerable Components',
        introducedByPR: '#89 (Upgrade base container image)',
        fixability: 'AUTO_REMEDIABLE',
        status: 'OPEN',
        evidence: {
            snippet: `9: # Base runtime
10: FROM node:20-alpine
11: WORKDIR /app`,
            vulnerableLine: 'FROM node:20-alpine',
            contextBefore: [
                '# Base runtime'
            ],
            contextAfter: [
                'WORKDIR /app',
                'RUN npm ci'
            ],
            explanation: 'Base Node.js Alpine image contains unpatched CVE-2024-21626 vulnerability.'
        }
    },
    remediation: {
        id: 'REM-SEC-002',
        findingId: 'SEC-002',
        strategy: 'Pin Base Image to Patched Alpine Minor Version',
        model: 'Claude 3.5 Sonnet (Security fine-tuned)',
        confidence: 99,
        rootCause: 'Unpinned base docker image `node:20-alpine` resolved to vulnerable runc layer.',
        patch: `--- a/Dockerfile
+++ b/Dockerfile
@@ -10,1 +10,1 @@
-FROM node:20-alpine
+FROM node:20.11.1-alpine`,
        filesChanged: [
            'Dockerfile'
        ],
        testsAdded: [
            'trivy image scan check'
        ],
        assumptions: [
            'Patched base image `node:20.11.1-alpine` contains updated runc binary.'
        ],
        risk: 'LOW',
        status: 'CANDIDATE'
    },
    validation: {
        id: 'VAL-DEP-001',
        remediationId: 'REM-SEC-002',
        findingId: 'SEC-002',
        overallStatus: 'pending',
        startedAt: new Date().toISOString(),
        steps: [
            {
                id: 'step-1',
                name: 'Docker Build',
                status: 'pending',
                command: 'docker build -t app:test .',
                logs: [
                    '[SIMULATED RESULT] Container image compiled cleanly.'
                ]
            },
            {
                id: 'step-2',
                name: 'Container CVE Scan',
                status: 'pending',
                command: 'trivy image app:test',
                logs: [
                    '[SIMULATED RESULT] Trivy re-scan passed: 0 CRITICAL vulnerabilities found.'
                ]
            }
        ]
    },
    pullRequest: {
        id: 'PR-158',
        number: 158,
        title: 'security: upgrade Docker base image to node:20.11.1-alpine to fix CVE-2024-21626',
        repository: 'user-portal',
        branch: 'security/upgrade-cve-2024-21626',
        targetBranch: 'main',
        originalPR: '#89',
        remediationId: 'REM-SEC-002',
        findingId: 'SEC-002',
        status: 'OPEN',
        validationStatus: 'pending',
        url: 'https://github.com/acme-corp/user-portal/pull/158',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    securityDelta: {
        beforeFindingCount: 3,
        afterFindingCount: 2,
        resolvedFindingId: 'SEC-002',
        newRisksIntroduced: 0
    }
};
const ALL_SCENARIOS = [
    SCENARIO_SQL_INJECTION,
    SCENARIO_VALIDATION_FAILURE,
    SCENARIO_SECRET_LEAK,
    SCENARIO_DEPENDENCY_VULN
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/simulator/stateMachine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canTransition",
    ()=>canTransition,
    "getStateMetadata",
    ()=>getStateMetadata
]);
const STATE_METADATA_MAP = {
    PR_OPENED: {
        state: 'PR_OPENED',
        label: 'PR Opened',
        description: 'Pull request received and queued for automated SAST security scan.',
        badgeStyle: 'bg-slate-800/80 text-slate-300 border-slate-700'
    },
    SCANNING: {
        state: 'SCANNING',
        label: 'SAST Scanning',
        description: 'Semgrep and security scanners executing rule checks on changed files.',
        badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60 animate-pulse'
    },
    FINDING_DETECTED: {
        state: 'FINDING_DETECTED',
        label: 'Vulnerability Detected',
        description: 'Security finding identified in code diff evidence.',
        badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60'
    },
    TRIAGED: {
        state: 'TRIAGED',
        label: 'Triaged & Evaluated',
        description: 'Security policy evaluated auto-remediation eligibility.',
        badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-800/60'
    },
    REMEDIATION_STARTED: {
        state: 'REMEDIATION_STARTED',
        label: 'Remediation In Progress',
        description: 'Security remediation engine generating candidate patch.',
        badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-800/60 animate-pulse'
    },
    PATCH_GENERATED: {
        state: 'PATCH_GENERATED',
        label: 'Candidate Patch Generated',
        description: 'Deterministic security patch diff created for verification.',
        badgeStyle: 'bg-indigo-500/10 text-indigo-300 border-indigo-800/60'
    },
    VALIDATING: {
        state: 'VALIDATING',
        label: 'Validation Pipeline Running',
        description: 'Multi-stage suite executing scope, linter, tests, and build checks.',
        badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60 animate-pulse'
    },
    VALIDATION_PASSED: {
        state: 'VALIDATION_PASSED',
        label: 'Pipeline Checks Passed',
        description: 'Formatter, linter, typecheck, and test suites passed 100%.',
        badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60'
    },
    RESCAN_PASSED: {
        state: 'RESCAN_PASSED',
        label: 'Security Re-scan Passed',
        description: 'Post-patch SAST re-scan verified original finding no longer detected.',
        badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60'
    },
    VERIFIED: {
        state: 'VERIFIED',
        label: 'Remediation Verified',
        description: 'Finding resolved without introducing regression risks.',
        badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60 font-bold'
    },
    PR_CREATED: {
        state: 'PR_CREATED',
        label: 'Remediation PR Created',
        description: 'Automated remediation pull request submitted to GitHub.',
        badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60'
    },
    HUMAN_REVIEW: {
        state: 'HUMAN_REVIEW',
        label: 'Awaiting Human Review',
        description: 'Security review team inspecting attached evidence and patch diff.',
        badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-800/60'
    },
    MERGED: {
        state: 'MERGED',
        label: 'Remediation Merged',
        description: 'Remediation pull request approved and merged into target branch.',
        badgeStyle: 'bg-purple-500/10 text-purple-400 border-purple-800/60 font-bold',
        isTerminal: true
    },
    VALIDATION_FAILED: {
        state: 'VALIDATION_FAILED',
        label: 'Validation Failed',
        description: 'Patch verification failed unit tests or linter checks.',
        badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
        isFailure: true
    },
    RESCAN_FAILED: {
        state: 'RESCAN_FAILED',
        label: 'Re-scan Failed',
        description: 'Vulnerability finding still detected during post-patch scan.',
        badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
        isFailure: true
    },
    REMEDIATION_FAILED: {
        state: 'REMEDIATION_FAILED',
        label: 'Remediation Failed',
        description: 'Unable to auto-generate safe patch candidate for finding.',
        badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
        isFailure: true
    },
    ROTATION_REQUIRED: {
        state: 'ROTATION_REQUIRED',
        label: 'Credential Rotation Required',
        description: 'Exposed secret requires manual token revocation and rotation.',
        badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-800/60 font-bold',
        isFailure: true
    }
};
const VALID_TRANSITIONS = {
    PR_OPENED: [
        'SCANNING'
    ],
    SCANNING: [
        'FINDING_DETECTED'
    ],
    FINDING_DETECTED: [
        'TRIAGED'
    ],
    TRIAGED: [
        'REMEDIATION_STARTED',
        'ROTATION_REQUIRED'
    ],
    REMEDIATION_STARTED: [
        'PATCH_GENERATED',
        'REMEDIATION_FAILED'
    ],
    PATCH_GENERATED: [
        'VALIDATING'
    ],
    VALIDATING: [
        'VALIDATION_PASSED',
        'VALIDATION_FAILED'
    ],
    VALIDATION_PASSED: [
        'RESCAN_PASSED',
        'RESCAN_FAILED'
    ],
    RESCAN_PASSED: [
        'VERIFIED'
    ],
    VERIFIED: [
        'PR_CREATED'
    ],
    PR_CREATED: [
        'HUMAN_REVIEW'
    ],
    HUMAN_REVIEW: [
        'MERGED'
    ],
    MERGED: [],
    VALIDATION_FAILED: [
        'VALIDATING',
        'REMEDIATION_STARTED',
        'TRIAGED'
    ],
    RESCAN_FAILED: [
        'REMEDIATION_STARTED',
        'TRIAGED'
    ],
    REMEDIATION_FAILED: [
        'TRIAGED'
    ],
    ROTATION_REQUIRED: [
        'HUMAN_REVIEW',
        'MERGED'
    ]
};
function canTransition(from, to) {
    if (from === to) return true;
    return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
function getStateMetadata(state) {
    return STATE_METADATA_MAP[state] || {
        state,
        label: state,
        description: 'Simulated state',
        badgeStyle: 'bg-slate-800 text-slate-300'
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/formatting.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFindingStatusStyle",
    ()=>getFindingStatusStyle,
    "getPRStatusStyle",
    ()=>getPRStatusStyle,
    "getSeverityStyle",
    ()=>getSeverityStyle,
    "getStepStatusStyle",
    ()=>getStepStatusStyle
]);
function getSeverityStyle(severity) {
    switch(severity){
        case 'CRITICAL':
            return {
                bg: 'bg-red-950/30',
                border: 'border-red-800/40',
                text: 'text-red-400',
                badge: 'bg-red-500/10 text-red-400 border-red-800/40',
                dot: 'bg-red-500'
            };
        case 'HIGH':
            return {
                bg: 'bg-amber-950/30',
                border: 'border-amber-800/40',
                text: 'text-amber-400',
                badge: 'bg-amber-500/10 text-amber-400 border-amber-800/40',
                dot: 'bg-amber-500'
            };
        case 'MEDIUM':
            return {
                bg: 'bg-yellow-950/20',
                border: 'border-yellow-800/40',
                text: 'text-yellow-400',
                badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-800/40',
                dot: 'bg-yellow-500'
            };
        case 'LOW':
            return {
                bg: 'bg-blue-950/20',
                border: 'border-blue-800/40',
                text: 'text-blue-400',
                badge: 'bg-blue-500/10 text-blue-400 border-blue-800/40',
                dot: 'bg-blue-500'
            };
        case 'INFO':
        default:
            return {
                bg: 'bg-zinc-900',
                border: 'border-zinc-800',
                text: 'text-zinc-400',
                badge: 'bg-zinc-800/60 text-zinc-300 border-zinc-700',
                dot: 'bg-zinc-400'
            };
    }
}
function getStepStatusStyle(status) {
    switch(status){
        case 'passed':
            return {
                badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40',
                text: 'text-emerald-400',
                iconColor: '#3fb950'
            };
        case 'running':
            return {
                badge: 'bg-blue-500/10 text-blue-400 border-blue-800/40 font-semibold',
                text: 'text-blue-400',
                iconColor: '#58a6ff'
            };
        case 'failed':
            return {
                badge: 'bg-red-500/10 text-red-400 border-red-800/40',
                text: 'text-red-400',
                iconColor: '#f85149'
            };
        case 'skipped':
            return {
                badge: 'bg-[#21262d] text-gray-400 border-[#30363d]',
                text: 'text-gray-400',
                iconColor: '#8b949e'
            };
        case 'pending':
        default:
            return {
                badge: 'bg-[#161b22] text-gray-500 border-[#30363d]',
                text: 'text-gray-500',
                iconColor: '#6e7681'
            };
    }
}
function getFindingStatusStyle(status) {
    switch(status){
        case 'VERIFIED':
        case 'MERGED':
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40';
        case 'VALIDATING':
        case 'REMEDIATING':
            return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
        case 'TRIAGED':
            return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
        case 'FAILED':
            return 'bg-red-500/10 text-red-400 border-red-800/40';
        case 'HUMAN_REVIEW':
            return 'bg-amber-500/10 text-amber-400 border-amber-800/40';
        case 'OPEN':
        default:
            return 'bg-[#21262d] text-gray-300 border-[#30363d]';
    }
}
function getPRStatusStyle(status) {
    switch(status){
        case 'MERGED':
            return 'bg-purple-500/10 text-purple-400 border-purple-800/40';
        case 'APPROVED':
        case 'READY_FOR_REVIEW':
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40';
        case 'VALIDATING':
            return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
        case 'CLOSED':
            return 'bg-red-500/10 text-red-400 border-red-800/40';
        case 'OPEN':
        default:
            return 'bg-[#21262d] text-gray-300 border-[#30363d]';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_188fi8h._.js.map