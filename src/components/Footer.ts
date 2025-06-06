export function Footer(): HTMLElement {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <footer class="bg-black text-white py-10 border-t border-gray-700">
      <div class="container mx-auto px-6 md:px-12 lg:px-20">
        <div class="flex flex-wrap justify-between items-start gap-10">
          <!-- About Section -->
          <div class="w-full md:w-1/2 lg:w-1/3">
            <h3 class="text-xl font-semibold mb-4">About</h3>
            <p class="text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
            </p>
          </div>

          <!-- Social Links -->
          <div class="w-full md:w-1/2 lg:w-1/3">
            <h3 class="text-xl font-semibold mb-4">Follow Us</h3>
            <div class="flex space-x-4">
              <!-- Twitter -->
              <a href="#" aria-label="Twitter" class="text-white hover:text-gray-300">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <!-- Facebook -->
              <a href="#" aria-label="Facebook" class="text-white hover:text-gray-300">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <!-- Instagram -->
              <a href="#" aria-label="Instagram" class="text-white hover:text-gray-300">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <!-- LinkedIn -->
              <a href="#" aria-label="LinkedIn" class="text-white hover:text-gray-300">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="mt-10 text-center text-white/60 text-sm">
          &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  `;
  return footer;
}
