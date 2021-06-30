class UnauthorizedUserError extends Error {
  constructor() {
    super();

    this.name = 'UnauthorizedUserError'
    this.message = `User is not authorized to perform this action.`;
    this.responseStatusCode = 403;
  };

};

module.exports = {
  UnauthorizedUserError
}