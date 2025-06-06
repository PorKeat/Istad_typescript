export function ProductSkeletonGrid(count: number = 8): HTMLElement {
  const skeletonGrid = document.createElement("div");
  skeletonGrid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full";

  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement("div");
    skeletonCard.className = `
      animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
      rounded-2xl shadow p-4 space-y-4 w-full
    `;

    skeletonCard.innerHTML = `
      <div class="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div class="flex justify-between items-center">
        <div class="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="flex items-center justify-between mt-4">
        <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    `;

    skeletonGrid.appendChild(skeletonCard);
  }

  return skeletonGrid;
}
