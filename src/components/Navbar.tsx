import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav class={styles.navbar}>
      <div class={styles.content}>
        <a href='/' class={styles.logo}>
          Shipwave
        </a>
        <div class={styles.links}>
          <a href='/' class={styles.link}>Button 1</a>
          <a href='/' class={styles.link}>Button 2</a>
          <a href='/' class={styles.link}>Button 3</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;