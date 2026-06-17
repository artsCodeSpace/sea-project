"use client";

export default function Seagulls() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* Seagull 1 */}
      <div className="absolute top-[15%] left-[-10%] animate-seagull-1">
        <svg
          className="w-12 h-6 text-primary/10 fill-current"
          viewBox="0 0 100 50"
        >
          <path d="M 0,20 Q 25,0 50,20 Q 75,0 100,20 Q 75,5 50,25 Q 25,5 0,20" />
        </svg>
      </div>

      {/* Seagull 2 */}
      <div className="absolute top-[28%] right-[-10%] animate-seagull-2">
        <svg
          className="w-8 h-4 text-primary/10 fill-current"
          viewBox="0 0 100 50"
        >
          <path d="M 0,20 Q 25,0 50,20 Q 75,0 100,20 Q 75,5 50,25 Q 25,5 0,20" />
        </svg>
      </div>

      {/* Seagull 3 */}
      <div className="absolute top-[8%] left-[-10%] animate-seagull-1" style={{ animationDelay: "12s", animationDuration: "32s" }}>
        <svg
          className="w-10 h-5 text-primary/10 fill-current opacity-70"
          viewBox="0 0 100 50"
        >
          <path d="M 0,20 Q 25,0 50,20 Q 75,0 100,20 Q 75,5 50,25 Q 25,5 0,20" />
        </svg>
      </div>
    </div>
  );
}
