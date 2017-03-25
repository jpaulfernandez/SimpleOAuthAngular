using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.OAuth;

namespace AngularDemoProject
{
    public class OAuthAuthorizationProvider:OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new []{"*"});
            //logic goes here
            if (context.UserName.ToUpper() == "USER")
            {
                if (context.Password.ToUpper() != "USER")
                {
                    context.SetError("Invalid Credentials");
                    return;
                }
            }
            else
            {
                context.SetError("Invalid Credentials");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role","user"));
            context.Validated(identity);

        }
    }
}   