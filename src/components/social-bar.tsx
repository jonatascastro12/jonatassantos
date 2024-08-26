"use client";

import { XLogoIcon } from "@/components/x-logo-icon";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Flex, Switch } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";
import { Suspense } from "react";

export function SocialBar() {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Flex justify="end" pr="5" className={"social"}>
      <Suspense fallback={<Switch checked={theme === "dark"}></Switch>}>
        <NoSSR>
          <Switch onClick={switchTheme} checked={theme === "dark"}></Switch>
        </NoSSR>
      </Suspense>
      &nbsp;
      <a href="https://github.com/jonatascastro12" target="_blank">
        <GitHubLogoIcon />
      </a>
      <a href="https://x.com/jonatascastro12" target="_blank">
        <XLogoIcon />
      </a>
      <a href="https://linkedin.com/in/jonatascastro12" target="_blank">
        <LinkedInLogoIcon />
      </a>
    </Flex>
  );
}
