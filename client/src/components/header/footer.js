import React from 'react';
import { Grid, Nav, NavItem } from 'react-bootstrap';

function Footer(/*props*/) {
  return (
    <footer>
      <div>
        <Nav justified>
          <NavItem
            eventKey={1}>
            Privacy policy
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
          <NavItem
            eventKey={3}>
            Some other professional link
          </NavItem>
        </Nav>

        <div className="text-center small copyright">
          © Bakole 2019
        </div>
      </div>
    </footer>
  );
}

export default Footer;