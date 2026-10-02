"use client";

interface TechMarqueeProps {
  items?: string[];
}

const DEFAULT_TECHS = [
  "NEXT.JS",
  "FASTAPI",
  "NESTJS",
  "PYTHON",
  "TENSORFLOW",
  "POSTGRESQL",
  "REDIS",
  "C++",
  "JAVA",
  "TYPESCRIPT",
  "SCIKIT-LEARN",
  "TAILWIND CSS",
  "DOCKER",
  "PHP 8",
  "MYSQL",
  "FLASK",
];

export function TechMarquee({ items }: TechMarqueeProps) {
  const techs = items && items.length > 0 ? items : DEFAULT_TECHS;
  const marqueeList = [...techs, ...techs, ...techs, ...techs];

  return (
    <div className="w-full my-12">
      <div className="ticker-container flex items-center">
        <div className="ticker-track">
          {marqueeList.map((tech, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span>{tech}</span>
              <span className="text-[#363636]/40 font-normal">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
