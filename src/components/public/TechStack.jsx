import Badge from "../shared/Badge";

const TechStack = ({ technologies = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 rounded-lg text-xs font-mono font-medium
                     bg-primary-500/10 text-primary-600 dark:text-primary-400
                     border border-primary-500/20"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechStack;