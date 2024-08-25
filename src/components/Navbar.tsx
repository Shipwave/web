const Navbar = () => {
  return (
    <nav class="w-full bg-[#1f1f1f] py-2.5">
    <div class="flex justify-between items-center max-w-[1200px] mx-auto px-5">
      <a href='/' class="text-white text-2xl font-bold no-underline">
        Shipwave
      </a>
      <div class="flex gap-5">
        <a href='/upload' class="text-white no-underline px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-white/10">Upload</a>
        <a href='/' class="text-white no-underline px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-white/10">Button 2</a>
        <a href='/' class="text-white no-underline px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-white/10">Button 3</a>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;