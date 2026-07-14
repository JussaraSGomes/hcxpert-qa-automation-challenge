class HomePage {
  elements = {
    loggedUserMenu: () => cy.contains('a', 'Logged in as'),
  };

  validateLoggedUser(userName) {
    this.elements
      .loggedUserMenu()
      .should('be.visible')
      .and('contain.text', userName);
  }
}

export default new HomePage();