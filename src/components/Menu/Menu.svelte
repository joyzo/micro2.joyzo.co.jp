<script>
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Portal,
    Transition,
  } from "@rgossiaux/svelte-headlessui";
  import clsx from "clsx";

  let isOpen = false;
  const open = () => (isOpen = true);
  const close = () => (isOpen = false);
  const toggle = () => (isOpen = !isOpen);

  const links = [
    {
      mainLabel: "ABOUT",
      subLabel: "ジョイゾーとは",
      href: "/aboutus",
    },
    {
      mainLabel: "COMPANY",
      subLabel: "会社概要",
      href: "/company",
    },
    {
      mainLabel: "RECRUIT",
      subLabel: "採用情報",
      href: "/recruit",
    },
    {
      mainLabel: "CONTACT",
      subLabel: "お問い合わせ",
      href: "/contact",
    },
  ];

  // 開閉ボタンがメニューに重なっている都合上、
  // on:closeにclose()を渡すと、開閉ボタンを押した時にtoggle()も実行されてしまうため、
  // Escキーによるクローズ処理を実装をここで行う
  window.addEventListener("keydown", (e) => {
    if (isOpen && e.key === "Escape") {
      close();
    }
  });
</script>

<Dialog
  open={isOpen}
  class={clsx(
    "invisible fixed inset-0 z-[60] overflow-y-auto bg-white opacity-0 transition-[opacity,visibility] duration-500 [&.open]:visible [&.open]:opacity-100",
    isOpen && "open"
  )}
  static
>
  <nav class="h-full">
    <ul class="flex h-full flex-col justify-center gap-8 py-16">
      {#each links as link}
        <li
          class="flex justify-center [&.hidden-desktop]:sm:hidden"
          class:hidden-desktop={link.hiddenDesktop}
        >
          <a class="flex flex-col px-8 py-6 text-center hover:bg-gray-50 transition-colors duration-300" href={link.href}>
            <span class="font-bold text-3xl sm:text-4xl text-black mb-2"
              >{link.mainLabel}</span
            >
            <span class="text-lg sm:text-xl text-gray-600">{link.subLabel}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Dialog>

<Portal>
  <button
    class="fixed right-6 top-6 z-50 flex h-14 w-14 flex-col items-center justify-center gap-1 text-white md:hidden"
    on:click={toggle}
  >
    <span
      class="absolute inset-0 m-auto h-1 w-7 -translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:rotate-45"
      class:open={isOpen}
    />
    <span
      class="absolute inset-0 m-auto h-1 w-7 translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:-rotate-45"
      class:open={isOpen}
    />
  </button>
</Portal>
