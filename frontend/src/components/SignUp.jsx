function SignUp() {
    return (
        <div className="form-signin container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Créez votre compte</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Adresse mail</label>
          </div>
          <div class="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Mot de passe</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Créez votre compte</button>
        </form>
      </div>
    );
  }
  
  export default SignUp;
  