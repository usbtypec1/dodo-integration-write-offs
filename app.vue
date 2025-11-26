<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #ff8000 0%, #ff9a00 50%, #ffc300 100%)"/>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>
