import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footerSecondLayerConteiner">
        <div className="footerMenu">
          <ul>
            <li>About</li>
            <p>KidCare helps parents find trusted, pre-screened babysitters near them.
               All caregivers are qualified and carefully selected for your peace of mind.</p>
          </ul>
        </div>
        <div className="footerContact">
          <ul>
            <li>Adress:</li>
            <p>Sfax,Tunisia</p>
            <li>Phone:</li>
            <p>+21655845231</p>
            <li>Email:</li>
            <p>KidCare02@gmail.com</p>
          </ul>
        </div>
        <div className="footerSocial">
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footerCopyright">
        <p>©KidCare 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
