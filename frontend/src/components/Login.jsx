function LogIn() {
    return (
        <div className="form-signin container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Connectez-vous !</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Adresse mail</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
        </form>
      </div>
    );
  }
  
  export default LogIn;
  