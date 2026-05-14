type Project = {
    name: string;
    description: string;
}

type Content = {
    header: {
        home: string;
        aboutMe: string;
        projects: string;
        contact: string;
    };
    home: {
        title: string;
        subtitle: string;
        headline: string;
    };
    aboutMe: {
        title: string;
        p1: string;
        p2: string;
        p3: string;
    };
    projects: {
        title: string;
        chip8: Project;
        cubeGame: Project;
        blogger: Project;
    };
    contact: {
        title: string;
        p1: string;
        form: {
            email: string;
            subject: string;
            message: string;
        };
        button: string;
        errorGeneral: string;
        errorTooManyRequests: string;
    };
    footer: {
        copyright: string;
    };
}

export type ContentLang = "en" | "sk";

export const content: Record<ContentLang, Content> = {
    en: {
        header: {
            home: "Home",
            aboutMe: "About me",
            projects: "Projects",
            contact: "Contact",
        },
        home: {
            title: "Hi, my name is Dominik",
            subtitle: "Hopefully soon to be a software developer",
            headline:
                "I'm self taught programmer living in Slovakia, passionate about building things and learning new stuff.",
        },
        aboutMe: {
            title: "About me",
            p1: "My programming journey started in high school in 2018, with basic HTML in Notepad, which ironically, I found boring initially. Things clicked when I actually built something I cared about, and I've been hooked since.",
            p2: "I studied economics at university but spent most of it writing code on the side, turns out that's what I actually wanted to do. Over the years I've gone from building websites and JavaScript bots to automating crypto trading, writing a crypto tax tool, and eventually moving toward lower level languages like Go and Odin which is where I feel most at home and lately started exploring game development.",
            p3: "I gravitate toward backend work, CLI tools, and anything that requires understanding how things work under the hood.",
        },
        projects: {
            title: "Projects",
            chip8: {
                name: "Chip-8 emulator",
                description:
                    "A Chip-8 emulator written in Odin (with SDL2 or compiled to wasm) and React. Features full support for all original Chip-8 opcodes so it's possible to load and run any Chip-8 rom.",
            },
            cubeGame: {
                name: "Cube game",
                description:
                    "A cube game based on Tetris written in Odin. This project contains two versions of the game, one with SDL2 and one with Web Assembly. The Web Assembly version is served with Astro and is playable in browser.",
            },
            blogger: {
                name: "Blogger",
                description:
                    "A terminal tool that generates README prompts or blog post prompts from a GitHub repository, then sends them to LLM (OpenAI or Anthropic) and saves the resulting Markdown.",
            },
        },
        contact: {
            title: "Contact",
            p1: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great. Feel free to reach out!",
            form: {
                email: "Email",
                subject: "Subject",
                message: "Message",
            },
            button: "Send",
            errorGeneral: "Unable to send email. Please try again later.",
            errorTooManyRequests: "You have exceeded the rate limit. Please try again later.",
        },
        footer: {
            copyright: "Dominik Michal. All rights reserved.",
        },
    },
    sk: {
        header: {
            home: "Domov",
            aboutMe: "O mne",
            projects: "Projekty",
            contact: "Kontakt",
        },
        home: {
            title: "Zdravím, volám sa Dominik",
            subtitle: "Čoskoro snáď softvérový vývojár",
            headline:
                "Som programátor-samouk žijúci na Slovensku, nadšený pre tvorenie a učenie sa nových vecí.",
        },
        aboutMe: {
            title: "O mne",
            p1: "Moja programátorská cesta sa začala vývojom webových stránok v roku 2018, s HTML v programe Notepad, čo som pôvodne bral ako celkom nudný proces. Nadšenie pre programovanie som objavil až keď som začal tvoriť veci, ktoré ma zaujímali a odvtedy sa tomu venujem.",
            p2: "Študoval som ekonómiu na univerzite, ale väčšinu času som venoval písaniu kódu, čo sa ukázalo byť presne to, čo som vlastne chcel robiť. V priebehu rokov som prešiel od tvorby webových stránok a JavaScriptových botov k automatizácii obchodovania s kryptomenami, písaniu nástroja na zdaňovanie kryptomien a nakoniec som sa presunul k programovacím jazykom nižšej úrovne ako Go a Odin, kde sa cítim najviac doma. V poslednej dobe som sa začal zaujímať aj o vývoj hier.",
            p3: "Inklinujem k práci v backende, nástrojom CLI a zaujíma ma všetko, čo si vyžaduje pochopenie toho, ako veci reálne fungujú.",
        },
        projects: {
            title: "Projekty",
            chip8: {
                name: "Chip-8 emulator",
                description:
                    "Emulátor Chip-8 napísaný v jazyku Odin (s SDL2 alebo skompilovaný do wasm) a Reacte. Ponúka plnú podporu všetkých pôvodných operačných kódov Chip-8, takže je možné načítať a spustiť akúkoľvek ROM Chip-8.",
            },
            cubeGame: {
                name: "Cube game",
                description:
                    "Hra založená na Tetrise napísaná v jazyku Odin. Tento projekt obsahuje dve verzie hry, jednu s SDL2 a jednu s Web Assembly. Verzia Web Assembly je poskytovaná pomocou framework Astro a je hrateľná v prehliadači.",
            },
            blogger: {
                name: "Blogger",
                description:
                    "Terminálový nástroj, ktorý generuje súbory README alebo blogové príspevky z repozitára GitHub, potom ich odosiela LLM (OpenAI alebo Anthropic) a ukladá výsledný Markdown.",
            },
        },
        contact: {
            title: "Kontakt",
            p1: "Vždy som otvorený diskusii o nových projektoch, kreatívnych nápadoch alebo príležitostiach byť súčasťou niečoho skvelého. Neváhajte ma kontaktovať!",
            form: {
                email: "Email",
                subject: "Predmet",
                message: "Správa",
            },
            button: "Odoslať",
            errorGeneral: "Nepodarilo sa odoslať email. Skúste to prosím neskôr.",
            errorTooManyRequests: "Prekročili ste limit. Skúste to prosím neskôr.",
        },
        footer: {
            copyright: "Dominik Michal. Všetky práva vyhradené.",
        },
    },
};
