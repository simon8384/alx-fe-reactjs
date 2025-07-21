import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    padding: '10px 20px',
    backgroundColor: '#004080',
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',  // <-- Add this line to center items horizontally
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;
