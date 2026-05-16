import { type ContentLang, content } from "./content";

export type Link = {
    name: string;
    url: string;
    icon: string
    ariaLabel: string;
};

export function links(lang: ContentLang): Link[] {
    const c = content[lang];
    return [
        {
            name: "GitHub",
            url: "https://github.com/dmc0125",
            icon: "github",
            ariaLabel: c.home.ariaLabelGithub,
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/dominik-michal-b5a8b6409",
            icon: "linkedin",
            ariaLabel: c.home.ariaLabelLinkedin,
        },
        {
            name: "Mail",
            url: "mail:dominikmichal0124@gmail.com",
            icon: "mail",
            ariaLabel: c.home.ariaLabelMail,
        },
    ]
}

