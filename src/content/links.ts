import type { SvgComponent } from "astro/types";
import type { ImageMetadata } from "astro";

import Github from "../assets/github.svg";
import Linkedin from "../assets/linkedin.svg";
import Mail from "../assets/mail.svg";

export type Link = {
    name: string;
    url: string;
    icon: SvgComponent & ImageMetadata;
};

export const links: Link[] = [
    {
        name: "GitHub",
        url: "https://github.com/dmc0125",
        icon: Github,
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/dominik-michal-b5a8b6409",
        icon: Linkedin,
    },
    {
        name: "Mail",
        url: "mail:dominikmichal0124@gmail.com",
        icon: Mail,
    },
];
