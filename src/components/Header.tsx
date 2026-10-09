"use client";

import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SITE } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "./Decor";
import { LocaleSwitcher } from "./LocaleSwitcher";

type NavKey = "home" | "tnr" | "volunteer" | "blog" | "contact";
const NAV: { href: Exclude<AppPathname, "/blog/[slug]">; key: NavKey }[] = [
	{ href: "/", key: "home" },
	{ href: "/tnr-method", key: "tnr" },
	{ href: "/volunteer", key: "volunteer" },
	{ href: "/blog", key: "blog" },
	{ href: "/contact", key: "contact" },
];

function Brand({ onNavigate }: { onNavigate?: () => void }) {
	const t = useTranslations();
	return (
		<Link
			href="/"
			className="group inline-flex items-center gap-2.5 text-forest no-underline"
			aria-label={t("a11y.home")}
			onClick={onNavigate}
		>
			<Logo
				className="size-14 shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-8 group-hover:scale-105"
				priority
			/>
			<span className="grid leading-[1.05]">
				<span className="font-heading text-[1.3rem] font-extrabold tracking-[-0.01em]">
					Cats <span className="text-ember">Ocosta</span>
				</span>
				<span className="text-[0.78rem] font-bold tracking-[0.06em] text-muted-foreground uppercase">
					{t("brand.tagline")}
				</span>
			</span>
		</Link>
	);
}

function DonateLink({ className }: { className?: string }) {
	const t = useTranslations();
	return (
		<Button asChild variant="donate-outline" size="sm" className={className}>
			<a href={SITE.teamingUrl} target="_blank" rel="noopener noreferrer">
				{t("nav.donate")}
				<span className="sr-only"> {t("a11y.newTab")}</span>
			</a>
		</Button>
	);
}

export function Header() {
	const t = useTranslations();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	const links = (mobile: boolean) =>
		NAV.map((item) => (
			<li key={item.key}>
				<Button
					asChild
					variant="ghost"
					size={mobile ? "lg" : "sm"}
					className={cn(
						"w-full justify-start aria-[current=page]:bg-secondary aria-[current=page]:text-forest",
						!mobile && "text-base",
					)}
				>
					<Link
						href={item.href}
						aria-current={isActive(item.href) ? "page" : undefined}
						onClick={() => setOpen(false)}
					>
						{t(`nav.${item.key}`)}
					</Link>
				</Button>
			</li>
		));

	return (
		<header className="sticky top-0 z-50 border-b border-line/70 bg-cream/92 backdrop-blur-md backdrop-saturate-150 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--color-tangerine)_0_40%,var(--color-butter)_40%_55%,var(--color-leaf)_55%_85%,var(--color-blossom)_85%)]">
			<div className="mx-auto flex min-h-[4.75rem] w-full max-w-[74rem] items-center gap-6 px-[clamp(1.25rem,4vw,2.5rem)] pt-1">
				<Brand />

				{/* Escritorio */}
				<div className="ml-auto hidden items-center gap-6 lg:flex">
					<nav aria-label={t("a11y.mainNav")}>
						<ul className="flex gap-1">{links(false)}</ul>
					</nav>
					<div className="flex items-center gap-3">
						<LocaleSwitcher />
						<DonateLink />
					</div>
				</div>

				{/* Móvil */}
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="secondary"
							size="icon"
							className="ml-auto lg:hidden"
						>
							<MenuIcon className="size-5" />
							<span className="sr-only">{t("a11y.openMenu")}</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						closeLabel={t("a11y.closeMenu")}
						className="w-[85%] bg-cream bg-paws p-6 pt-16"
					>
						<SheetTitle className="sr-only">{t("a11y.mainNav")}</SheetTitle>
						<SheetDescription className="sr-only">Cats Ocosta</SheetDescription>
						<Brand onNavigate={() => setOpen(false)} />
						<nav aria-label={t("a11y.mainNav")} className="mt-4">
							<ul className="grid gap-1">{links(true)}</ul>
						</nav>
						<div className="mt-auto flex items-center justify-between gap-3">
							<LocaleSwitcher />
							<DonateLink />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
