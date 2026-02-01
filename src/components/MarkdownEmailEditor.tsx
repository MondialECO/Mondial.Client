// "use client";

// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import MDEditor from "@uiw/react-md-editor";

// export default function EmailEditorWithTheme() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [value, setValue] = useState<string>(`
// # ইমেইল বডি (Dark mode সাপোর্ট সহ)

// **বোল্ড টেক্সট**  
// *ইটালিক টেক্সট*

// - লিস্ট আইটেম ১
// - লিস্ট আইটেম ২

// 1. প্রথম ধাপ
// 2. দ্বিতীয় ধাপ

// <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; border-radius: 0.75rem;">
//   এই অংশ মাঝখানে align করা
// </div>

// <div style="text-align: right;">
//   ডান দিকে align করা টেক্সট
// </div>
//   `);

//   // Hydration fix
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === "dark";

//   return (
//     <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
//       <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
//         {/* Header + Theme Toggle */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold">
//             ইমেইল বডি এডিটর
//           </h1>

//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(isDark ? "light" : "dark")}
//             aria-label="Toggle theme"
//           >
//             {isDark ? (
//               <Sun className="h-5 w-5" />
//             ) : (
//               <Moon className="h-5 w-5" />
//             )}
//           </Button>
//         </div>

//         {/* Editor */}
//         <div className="mb-10 rounded-xl border bg-card shadow-sm overflow-hidden">
//           <div data-color-mode={isDark ? "dark" : "light"}>
//             <MDEditor
//               value={value}
//               onChange={(val) => setValue(val || "")}
//               height={520}
//               preview="live"
//               visibleDragbar={true}
//               className="w-full"
//             />
//           </div>
//         </div>

//         {/* Preview */}
//         <div className="mb-10">
//           <h2 className="text-xl font-semibold mb-4">প্রিভিউ (ইমেইলে যেমন দেখাবে)</h2>
//           <div className="rounded-xl border bg-card p-6 sm:p-8 prose prose-neutral dark:prose-invert max-w-none min-h-[160px]">
//             <MDEditor.Markdown source={value} />
//           </div>
//         </div>

//         {/* HTML Output */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-lg font-medium">HTML Output</h3>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => navigator.clipboard.writeText(value)}
//             >
//               কপি করুন
//             </Button>
//           </div>

//           <pre className="bg-muted p-5 rounded-xl overflow-auto text-sm max-h-80 font-mono border">
//             {value || "// কোনো কন্টেন্ট নেই..."}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }