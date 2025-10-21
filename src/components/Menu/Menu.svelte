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
      mainLabel: "ABOUT JOYZO",
      subLabel: "ジョイゾーとは",
      href: "/aboutjoyzo",
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
    "invisible fixed inset-0 z-[60] overflow-y-auto bg-gray-900/95 backdrop-blur-sm opacity-0 transition-[opacity,visibility] duration-500 [&.open]:visible [&.open]:opacity-100",
    isOpen && "open"
  )}
  static
>
  <nav class="h-full">
    <ul class="flex flex-col gap-6 py-8 px-6">
      {#each links as link}
        <li
          class="flex justify-center [&.hidden-desktop]:sm:hidden"
          class:hidden-desktop={link.hiddenDesktop}
        >
          <a 
            class="group flex flex-col items-center px-8 py-4 text-center transition-all duration-300 hover:scale-105" 
            href={link.href}
            on:click={close}
          >
            <span class="font-english font-bold text-3xl sm:text-4xl text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
              {link.mainLabel}
            </span>
            <span class="text-base sm:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {link.subLabel}
            </span>
            
            <!-- 下線アニメーション -->
            <div class="mt-3 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Dialog>

<Portal>
  <button
    class="fixed right-4 top-2 z-[70] flex h-12 w-12 flex-col items-center justify-center gap-1 text-white md:hidden"
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
