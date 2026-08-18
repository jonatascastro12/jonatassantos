import { XLogoIcon } from "@/components/x-logo-icon";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function SiteFooter() {
    return (
        <footer className="site-footer social" aria-label="Social links">
            <a href="https://github.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubLogoIcon />
            </a>
            <a href="https://x.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="X">
                <XLogoIcon />
            </a>
            <a href="https://linkedin.com/in/jonatascastro12" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInLogoIcon />
            </a>
        </footer>
    );
}
