const path = require("path");

module.exports = {
  styleguideDir: "docs",

  template: "src/templates/index.html",

  // @see https://react-styleguidist.js.org/docs/components.html#sections
  //
  // You can group components into sections or add extra Markdown documents
  // to your style guide. Each section consists of (all fields are optional):
  // -- name: section title
  // -- content: A glob pattern string or a function returning a list of components.
  //             The same rule apply as for the root components option.
  // -- sections: Array of subsections (can be nested)
  sections: [
    {
      name: "Styles",
      components: "src/styles/**/[A-Z]*.js"
    },
    {
      name: "Components",
      components: "src/components/**/[A-Z]*.js"
    }
  ],

  theme: {
    color: {
      link: "#0099e5",
      linkHover: "#005b89"
    },
    fontFamily: {
      base:
        "HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif"
    }
  },

  styles: {
    StyleGuide: {
      content: {
        margin: "0",
        "max-width": "none"
      }
    },
    Logo: {
      logo: {
        background:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA84AAADWCAYAAAAAeNszAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR42u3dW3CU573n+x9YljkpatwYEmJEgydmFEemNWbivexUaFJydONYYtdUOa4ypon2RTyVhHY58Vx50VSuth3HzcqqHV9shcZOlRcXu5CS3MioQmuN7bWzhgwSMtbCswItbBNz6NAKx8jYzMX7NDSgQ6v7ffs9fT9VlBMOre7nPfTze5/n/zzzrl27JtRPz2BnRFJKUkJSXFJe0rCkbG/HQI4WAgAAAABvmUdwrmtoTklKS2qe5q/skZTu7RjI01oAAAAAQHAOU2BOSMpIWl/BX5+QlOntGEjTcgAAAABAcA56YI6ZwNxVxT8fl5Tq7RjooyUBAAAAgOActMBcqmPeYcPLDUlKMn0bAAAAAAjOQQnNSVmjzM02v/QuWfXPRVoZAACgvgptrRFJ3bIWd42b395Y9leGzH9zshZ+zUVHx+i3AQRn3BKYE7IW/tro4I+ZMOE5Q4sDAADUJTAnTWCupvSuX1I2OjpG6R1AcA59YI6ZwLy1jj92RFb9c44jAAAA4FhgTktabcPLjUtKRkfH6LsBBOdQhua0rFrmZpfeQr8J0HmOBgAAgC2BOSYpK2dmEfabAM0UboDgHIrA3C2rjnm1B97OhHkvGeqfAQAAagrNCUl9cnZQZEJSIjo6NkyLAwTnoAbmuAmpGz349ti+CgAAoPrQnJS0u04/bkJSKjo6lqXlAYJzkAJzRFaNy3YfvN0hE6B5igkAAOC90FxuE3XPAME5KKE5ZUJzs8/eOttXAQAAzB6a45IOufTjmbYNEJx9H5gTshaGWO3jj8H2VQAAANOH5oisPZfd7O+NmPDMYAdAcPZVYI7JqmPuCtDHGpeUZPsqAACAm4JzRt4oxdsZHR1Lc0QAgrMfAnNE1tZSOwL8Mdm+CgAAQK5P0Z7KmujoGH00wKPm0wRSz2BnUlI+4KFZskbRj/cMdqbNgwIAAICwSnns/aQ5JIB3hXrE2dQxp+XN7aWcNi6r/jnLZQAAAMKk0NYak3Tcg29tKbXOAMHZS4E5ZgLzVk4Btq8CAAChC84pSa968K09Fx0dY1FXgODsidCcljU1p5nDf5M9JkDzlBN2d04ikpKSuqf446KkvujoWJaWAnxzTcfMNZ3gmvbVcYub/k9sij/OS8qGaT/hQlvrsKT1HnxrQ9HRsQRnLEBwdjMwd8taLXs1h31abF8Fuzsmla5Wuic6OpakxQBPX88RWds0dnFN+y4wZysMibuio2OpkJzL57z6/qKjY/M4cwGCsxuBOW4C80YOd8XYvgp2dEr65njdMT0N8O41HTPX9FxG6DaFaQTTw6E5p7nNsgv8vbjQ1pqQdMDDb5FrB/CgwK6q3TPYGekZ7MzK2maA0Dw3qyUd6Bns7DP14MBcQ3Ouiuuum9YDPBu+qpnWmqD1XD1uSdMHmmtpWhjuxTHeH4C5aghoaE7JWvzLlTrmlqb7FF2wQi1N913/vbNXTuns5U909NxhPzVll6SunsHOnZIy1D+jwg52nyiJAIJyTXfLmubLuiD+C827aQmCMwCC83SBOWG+4OveaV+2cIUeW7VZ7csfVXTB8hn/7ofnj+nouRH927nDOnTmXT807Q5JqZ7BzhTbV2GW0Jyjgw0QvuDqccuKXUMAgOA8TWCOmcBc9ynZyxauUNfaLXrkS49V/G9WNa3Vqqa16mjZLEk6dOZfdPTciI6eO6wT5//k1WZulrS7Z7AzKWsBsRyXD27pYGcIzUBgrum0rIemIDQDAPwenHsGOyOytlZw5cu9a+0WPdayWQsbFtf0Ou33/J3a7/k7SdLlqxevj0QfPTeis5dPea3ZN8qqf2b7KpSHZkalAMIX3DtmpbUl1tMaAEBwvjU0J+XSCNe6pQ+q54GfTDsl+/LVi3rn5Fv6n2Ya9qKGJWppuk/t9zyiVU1rZ3zthQ2LbwrShSunb0zrPv2uLl294JVDsFVSd89gZ6a3YyDNpUQHG0AgwldWlW03Be8ct5jmvuJ52BV5fwDmynfbUZk65owbXxDLFq7Qd+9/9nqonSow7z+xT/tP7Js24C5qWKL25Y/oPy59UO33PDLn0eqZ6qNbmu7TwobFamm6T4salki6sSjZh+ePORm62b6K0GyHoejoWIKWBVwLzTmbv1t3RkfH0rSuo8fNibUlAn8vZjsqANXwzYizqWNOy6XRrdmmZb/75/168+hrs4bTS1cv6J2Tb+mdk29dD7vt9zxS0Wi0dHt99FxD9zt/fkvvnNxvd4gubV81ZAJ0nkuLDjYAX4WvLNe0L8Nfn1hbohrDvD8Ac+X5EeeyOuaUG18O7fc8oqfWPTvttOyj5w7rnz54zZZFvWodja5UJSPjNWL7KkJzNRhxBtwJzTmHvl8ZcXbuuCXl3NoSobgXF9pa8/Lm1okj0dGxOGc54D2eHnHuGezsljUt25Xtpb731R9r3dIHp77hXjmtN4/+0tbtpKYajX70S49p3dL1FY1GV2phw2I9sfZpPbry2+o/9sb1n2cjtq+igw3A+9c0ezT787ilJL1KS9SsT9J2D76vHIcG8CZPjjj3DHbGTWCu+/ZSixqWqGvt09NOhS6N1vYfe6Ou7+up+79f1fTsShw9d1i/ev9nTq3gPSJr9W2+CAjNs2HEGajfNZ2U86vhM+Js/3HLyvmStbCMOMclHfLgW1sTHR3Lc7YDBOfZAnPEBGZX6pgfa9msrrVbaq5jttO6pQ+qa+2WaUe+7fSbY7928oHAHln7P/NlQAeb4Ay4e02nVZ9tHAnO9h2zevaPQnMvLrS15uTCIA1tD/iTZ6Zq9wx2pmQt/uW57aXsrGOu1GwreN8a6N8++ZaOnjt822usW7reLD42++uUpm/3Hnn5tteyAdtXEZoBuH9NZ8UWcn4MzTmxeJsT0vLW6tr0jwAPc33E2WwvlZVH65gdqgGe1mxTxctdvnpRL/3xJxUF+rkE8dLDAgenb4/Lmr7dxyVIB7sMT9oBZ8NXn+o7usaIc+3HzY0Vz0N1L/bQqHN/dHSsm7MeIDhPFZhj5svAs3XMDq46PaXZporf6lfvvzLnUN/zwI/1yJceq/jvD57Yp/5jv3aqHdi+itBMcAbqE5pzqv+IJcG59tCcU/1n4oUtOMdkbf/k5iJ5E5Ji0dExdiMBPKzuU7XLtpfa4cYHrqSOuf/YG06NtE5ptqni07n06dzDbO+Rn2nd0vUV/6yOls16dOW3nVoQbaOk4z2Dnbtk1T/zhRHeDjYA58JXn7y57Q6mP26seF4n0dGxvFmp3M2ypCShGfC++XUOzUlJeTdCc/s9j+ilb7yh797//SlD89Fzh/XSH3+i3iM/q1toXrZwhV546GW98NDLcw7NpYcA1Th7+ZM5/f3S9lUvfeMNtd/ziBNNsV1S3pwfcK+jFiM0A4ELzTlCs++OW1LSPkJzXcNzVtIul378tujoGKVrgA/UZaq2qWPOuNEhb2m6T9+9//u+rWOezVxX+m5puk87Hv5/avqZbF8V6A62mx01pmoD9oavjMvXNFO1537c0nJpRh73YlfKlJ6Ljo5lOPMBgnOpjjkjqaveH2zZwhXqWrtl2npet/ZjfnTlt/XUNKPeVd/oTfg/dPrdGQO0nT/78tWL6j3yMx06865TTdVvAnSey9TxjkJC1lROt0c3CM6AfaHZC6vhE5y9Hdq4F099HNKqz8OLbWakG4BPOFLjXFbHnHKjM+7V/Zifuv9ZrWpaa/trRxcs1/e++rz01ed19Nzh61tJnb1ySssWrNCihsVqX/5oVdPBp7OwYbGWLVzhZJN1SUr0DHZmJGWofw58BxuAPdd0Rlb5C/xzzCKy6pm7aA33RUfH0malbaceKI9L6o6Ojg3T2oC/2D7ibOpU03KppmqmVaPd2o95ppFvP/rw/DG9+cEvndjreaYvGbavsr+zlpL0qofeEiPOQG3XdFbe2qOZEefKQnNO3lpbgnvxjWOTln0PoiZkzcLMsBAY4E+2jTj3DHbGzQ3Btb3wHl357SkDauHKafUeebmeQU+S1LV2ix5r2WzrtGy3HTrzL/rHkbr3g1ZL2tcz2DlkAjRPaYPXwQZQWwe/3ns0o/bjxornHmbCbcrM4khJSqq6EehxWTMKCMxA2IOzmZad8UIn/NFpRnVf+uOP67q9VPs9j+ipdc/aOjXaKy7XcXr7FDZKOsT2VTV3sD1xvQKw7ZrOidXw/Riac2LlbD8E6LwJzimzTVhCUlzTP6iakLUvdE5SLjo6lqMVAYKzegY703Kpjnku1i1dr7OXnV81e9nCFfreV3887QreQfDIlx5TdMEK9R97o+4j+GW2S0r2DHamezsGWI2SDjZA+IKfjltS7q94jupCdJ+sWQLlxzMmKSZpmBFlgOA8VWBOyJp24qnpRR+e/9OUofWp+7+vo+dGHBt1XtSwRI+1bNYTa58OxUmzbumDeuGhl3XozL/onz74ZV1H88s0S3rV1NSzfdXsHbWY+bInNAOEZrgbmlmQMVhhOi8pT0sAwTd/joE51jPYmZN0QB6syek/9mtdvnrxtt9f2LBYP3gwrUUNS2z/mY+u/LZe+sbroQnN5drv+Tv934++rq61Wxxp2wqtl3SgZ7Czz2x/hqk72MOEZiBQ4esQodl3xy1DaAaAgAfnnsHOiNkW6Lg8vPjIpasX9ItpFq5a1bRWP1hv37Z865Y+qPTDv9T3vvp8oBb/qsYTa5/WCw+97GZ4lqxtPIZ7BjvTpu4eur5Hc44ONhCo0Ez48t9xy4ptwgAg2MHZTIXN++WGf/TcYf3q/VemDbs9D/y4ptdftnCFeh74sV546GVH9mR25Qv9ymkNntinwRP7qn6NVU1r9cJDL7v9UZol7TABupuOWmtS1uwQQjMQnPBFaPbXMYuYPYFZkBEAfK5hltCc9ePN/p2Tb2nZghVTTp9+5EuP6d/OHdY7J+e2WFgQ65gvX72o/Sf2qf/YGzfa7s/79YP16apWBF/VtFbrlj7o5qJhJaXtq3b1dgykQtpZS5uHCACCE5oJXz4LzWJBRgAIR3D285d0/7E3tGzhiin3df7eV5/X2cufVBzwHl35bT11//cDMyW7FJj3n9inS7dsL3Xi/J+U/v+frfohQeHKKS991DgdbACEL7hw3Py8eFvMPHx1U190dGyYMwmAl8y7du3atH9o6pp9W5OzqGHJtFOqL1+9qPQfnp1xRegg7sf87p/3q//YGxWthL1s4Qp1rd0y5cOHqfzq/VfmPJLvsJ29HQPpsFzMpoOdlVXvjeqMSErZse+mOR5JSV6uuc+aFWHdPneTsrZz8SLX9mElNNtiSFKynuc5K57bZk90dCzp0DGKmfuzFxXNvZmtrQA/BWcTnrtl7Te42o8fcNnCFUo//MspR4s/PH9M6T88e9vvr1v6oLrWbgnUfsxHzx3WP33wmk6c/1NVbdi1dova73nktna8fPWiDp15t+IwXifjkpJh2qKKDrbt2msZ7fBRx3lCUsKtkR0fnbeOdeAJX3U7z2P1CCIs3ma7bdHRsWwIj9GEpG63HtoBqDI4lwXotKSUH7/ES/sOT2XwxD69+cFrgQ3MH54/pjc/+KVtdcfLFq5QdMEK68vnyikvheXSF026t2MgE6aL2HSws4RmW/VHR8e6azgmOXl4B4JbjEdHx2Iunbt98s8MCds78ITmunouOjqWcfi4EZrtNxQdHUvYeIxisnaI8YMJSXEvzAoCYGmo9C/2dgykzWJhafmsfrI02vrd+79/2591tGxWR8tmfXj+WGBWybZC7Wn1H3vD9qnTZy97LiyX7DKhOVRTm+hgO6bW6dUbffRZVxfaWiMuTQv0U1lBrE7XNOHLGQlZs+ecOm5ZsbaEH/hpx41m834zHDbAZ8HZhOe8pKQJ0Bn5aIRr/4l9amm6b9p63aCE5pkW/gqoIVnTsvNhu3gLba3dskaaCc2w40EB9XTuX9MpSa/SEo4YdvC4EZr9da/j/QJwPjiXBeicpLjZ4znjl477m0df06ol9wVqZLncu3/erzePvhaWwDwuKdXbMdAX0g52UoxKwSZMBfTENU348t8xY20JAAiR+bX8496Ogays6Wu7/PBhL129oH88nNblqxfn9O8uX73ohb2Jp3X03GHt/MN/Ve+Rn4UhNE/IWi07FuLQnCY0A8EJX4RmXx63GKEZAMKlodYXMDWlKbN1VVYer+07e/mUTpz/04wLgJWmOx868+6Uq1CvW/qgWpru02Mt/6erW1UVrpzWm0d/qUNn3g3L+bpH1ihzaKeU0sEGghWaCV++PG6sLQEAoQzOBxsjkuKS8towma8hQOclJby+fVX7PY/MGppf+uNPZty26ei5wzp67rD2n9inrrVb9MTap+v6GS5fvaj+Y29o/4l9YTlPh2Qt/JWr9YXm7c3HJRWvPRnL+6kB2KMZCFz4iknqIzT77rglzHEjNANA6IKztWCGFXIPNu6SlNaGyapH9Mz02T6vbl/11LpnZ/zzd06+Nae9jvuPvaFFDYvV0bK5Lu9/8MQ+9R/7dZjqmNOmJKDWwJxQ2YJ28/bmN117MpbzQyMwKgUELnwxYunP45YUZTIAEFrzdfPI8HZJeR1sTNX6wr0dA2lZI9l7vPSBZ5tafWmO9c9WeP614+/76LnD+m/vPKM3PwjN4l87JcVrDc3z9uZj8/bm+yQduCV4JnzUwR4mNAOBCV8JQrMvj1uK0AwA4TZVjXOzpFdNeE5qw2SuhvCc143tq9LyQP3z5asXtbBh8bR//ljL5jlv5eRkkC1cOa3eIy97enEym/XLqmPO1xiYI7JmPOzwcUeNUSkgWOErSfjy5XHLirUlAIDgPMOfrZZ0QAcbh0yArjrImNrUhBe2r9p/Yt+MNckLGxbrhYde1kt//EnFgbhr7RZHAn7I6phHTGDO1fpC8/bmXT/PbOpg+/ozALjpmmaPZv8ds4i5DxOaAQThnpaQtV5OPdahmpCUiY6OpYPUhpVsR7VR0nEdbMyYhcSqVrZ91U63PnD/sTf07p/3z/h3VjWt1UvfeF1da7do2cIV0/69ZQtX6Afr07YvDjZ4Yp9eePuZsITmCUnP9XYMxGsNzfP25hPz9uaHZY3o+D00+/ozALjpms4Smn0pR2gGEJDvobisssV6Ld7cLGmH6dMGxly2o9ouKamDjWltmMzUEJ6LktJm+nZWLkzf7j3yM504/yd1rd0y7bTthQ2L9cTap/XE2qdVuHJaZy9/cn269Kqm+7RswQqtalpr6/s6eu6wfvX+z3T28qmwXMe7ZC3+VdP2UvP25mOyRgV8v+K0eRrIVE4gOJ2VNOHLl8ctJdaWABAcKZd+biyswbn09MDO+udEz2BnQvWbNnDd/hP79M7J/Xpq3ff1yJcem/HvRhcsV3TB8hm3sarpCzp8dcxDkpLUMXvqxgbAGUmawJe6aQIAARKjCeofnEvsrn+OubF91aWrF9R75Gd6++Rbeur+Z20fQa7EP33wWpjqmMdl1TH31fpCpo45LY/uF16DiAAEyWqaAAAA/5tf47+3s/45LetpSN23rzp67rDSf3hWv3r/FV2uYjuqWixqWKJFDUuCfp5NSNrZ2zEQqzU0mzrmnKzpzHRIAQAAAHg+OJeU9n9O1hiei70dA0lJm2RN562rd06+pRfefkaDdRwBfmLt00r/H7/Uoyu/HdRzbI+kmHkwUktgjs3bm8/KWthgI5cuAAAAAL8FZ8maYr1bBxuHdbAxUWOAzvV2DCQkbZM1vbduLl29oDc/eE3/7Z1n6lZzHF2wXN/76vN64aGXHaujdsGQpE29HQPJWhb/mrc3H5m3N5+WNCwW2AEAAADg8+Bcsl5W/XOfDjbGagzQWUlxubB91dnLp/TSH3+ifxzZqcKV03X5meuWPqgXHnpZPQ/82M/Tt8clbevtGEjYsL1U0gTmHWJrJgAAAAABCs4lXbLqn9O11D+b6dtpSWsk9de7gQ6deVcvvL1Fvzn267rVPz/ypcf00jdeV0vTfX46lyZkPeCImwcetQRm6pgBAAAAhCI4l+yQPfXP+d6OgW5Z9c/j9W6o/mNv6IW3n9G7f95fl5+3sGGxfrA+7ZfzqN8E5nSN07KpYwYAAADgOQ11+jml+ueUpFSN+z/nZG1flZK1HZEr21d1rd0yZT3y5asXtf/EPv3buRG1NN2nrrVbtLBhcVU/L7pgudfPnxFZ20vlanmRsv2Y67odGQAAAAB4KTiXlOqf+02AztcQoDM9g51ZSRnVedGoo+cO66U//kSPrvy2nrr/+9eD8W+O/Vr7T+zTpasXrv+9d07u12Mtm/XE2qfn/HPqvTXWHEyYwJyt9YUCvB8zAAAAAIJzTbokdelg405JGW2YrGp6r5kWnOwZ7MyYAF3X6b3vnHxLh06/q1VNa1W4ckpnL5+67e9cunpB/cfe0Dt/fkvfvf9Ztd/zdxW//psfvObFc2aXpJqmZJvAHHfjmAEVKtIEAPcAuC5PEwAIe3Au2SEppYONKW2YzFb7Ir0dA8OSEj2DnUnVefTy0tULFW1bdfbyKf3jSFotTffp0S89pvblj047Fbtw5bTePPpLHTrzrpfOlSFJyd6OgZq+xMy07LrPEvCRHA8TPCFDE8Am/bIeFsM9E5KyVdwDOG7uGpFVwgUABGejVP9shd7a6p+zPYOdfeZGu8OLDX7i/J904vyf9OYHr6ml6T4tbFis/7h0vRWur5zSh+bPPWTcBOZcrS9k9mOmjnkG0dGxdKGtNUF4dvV8T0VHx3I0BWySlPVAbD1N4do13R0dHcvP8V6cK7S1bjMBujmEbZZ3+T3kJGWio2OM/AMgOE9ho6z65z0mQFd10zZTiNNl9c+efWJcCsiVjFi7YEJSxmwFVmtg7jbHgjrmyjpsiUJba1JSrMaX8lsAd3t0IT/XzjVQwfVcNA/DukN4Te/R3Ed6PXNNR0fHspKyhbbWuKRIDe8jKX/NsspGR8fSXL0A4N3gXLJVUrcONlp1y9XXP+cldfcMdiZMaONp/9w6OynqmF3tbNfc2Sy0taZ91vZFRnoR1PBsR4D04TWdD8I1HR0dG67xuCW4CgDA/+Z79H01y5pqPWzD/s+53o6BuKTnZI2iYnpDktp7OwaSNe7HHDH7MR8iNAMAAAAgODtrtaz655wONiZqDNAZWdPkdnHYbzMuaVtvx0DCLLRWNVPHnBeLfwEAAAAIiAafvE87659TZfXPYR8NnTDtkLFhWjZ1zAAAAAiVWdZBGGaRO4KzW+yqfy5tXxXmsNcvq445X2Ngpo4ZAAAAQQ7GcVkzVxPmtzfO4d+X/ueEpNLMzlzZf1mcdPa2Lz8Gs+W20s4Aw+a/uVrXqvBrcJZu1D8ndbAxXeP+z309g505WSv5hmWbpBETmHM1Bmb2YwYAAEAQw1q37N/JoLns9Ur/3WF+ZilU50r/DetIdaGttbus/asZ3Fxtfm0se80JSX2ydg2oOgM1+LhdS/XPSdWw/7Oftq+q0YQJzNlaX2je3nxKUlrsxwwAAIBghOWkCWxuzEQtherysDdignQuOjrWF/D2j5j2TznU/s2yBvu2Ftpax02O6Zvrw4n5AWjrUv1zVgcbq95nsbdjIN/bMdAtaZOsUdkg2SUpVmtonrc3n5i3N5+X9CqhGQAAAH4Oa4W21mShrXVY1k4w2+Wt8s315j3tK7S1Xiu0tfYV2lpjATwOaVlTql+tU/tbg6/ScKGtNTmXf9gQoHa/Uf+8YTJdQ4DOSYr3DHYmZY1A+zkgDklK2lDHHJO1Byl1zAAAAPB1YJY/yzS7JCUKba3xINREmz3us3LvYcVqSbtNeO6uZPR5fsCuBav++WBjXgcbu2t5ITM6G5M/t68al7TJbC9V9YVl9mPOSDpOaAYAAIDPw1pS1ujmDvlzcKxZ1sCen49BpNDWmpF0QN4Y4d8oKW+m64cqOJc/Qdhn9n+OV/sivR0Dxd6OgZSkNbJGb71uQtJzvR0DMRsW/0qZG8t2brMAAADwcViLmynZu+X/csMuHx+HmKy6ba/li2ZJh2abuj0/4NfJRkmHbKp/TkjaLGs014v2yKpjrukpFHXMAAAACFBoTsuqYV4foM+U8OF7jstaMdzLx2H3TOF5fkiuma2S8jrYmK7lRXo7Bvp6OwZiknbKGt31giFJ7b0dA0mzQni1gTk2b28+J+9MmwAAAACqDWqRQltrTmbLJ7h6LJKyHl74YVAuM9207fkhOmZ21j+nZW3CvcfFzzMuabOpY656U2/qmAEAABCwoFYa3aRv643QvNtnmbHPLCIX2uBcYlf9c763YyCp+m9fNSFrxDve2zFQ055u1DEDAAAggKE5J2ZQekG3z0JzeV5ME5xvsKv+OdfbMRCXtE3OT9/eYwJzusZp2Yl5e/PDoo4ZAAAAwQvN9G+9wc915dtvrSWfz/G0rf45K2v7qp0OvMcRWdtLJWvcXio2b2++T1Yd83oOPQAAAAjNwJTSBOfbldc/J2oIz0VT/2zX9lUTkrb1dgzEa9leytQxp2XVMXdxuAEAAEBoBma0sXzU2fngvKZXevDfpZUvSndEvN44qyUdMPXPsRoCdGn7qk2qfvuqnbK2l8rW8oHm7c0ndWOjdwAAACBIoTkiKUtohkOS9QvO0S1SY4sVnB/8X9Z/ffB0QdJxHWzM2FD/HNPctq8akrTGxjrm3dxIAAAAEFBZUYII52wtrbBd36nadzSbAP3v0l2+WOhuu6z651QtL2Kmb8c08/ZV47LqmBPUMQMAAAAzK7S1pkQZIpzXLUkNrvzoxhYp1isd7fBDQzVLetWE56Q2TOaqDM9FScmewc6MrCH/0lZYRUl9NkzJjkhKiSnZAAAACH5ojmmKLYMAh4JztsG1H9/0TWnZM9LZ1/3SYKX65yEToPNVBuhhE3BtY+qYM2JKNgAAAMIhS98XdZKQ3F5Vu9GX+5LbUv9sU2CmjhkAAAChYlY63khLoKzwBiwAAB6eSURBVE6aC22tcbajqp4t9c9VBmbqmAEAABBWWZoAdRZv8M1bjTwhtfzcWmDs8Fekz4peeFe21D/PITCX6phTCtAIczzSqOSaJYovbZQk5S9eVeboXzVcnOQSBQAAwHWFttakrBJKoJ5i3g/Od622FhJr+uaN31v5ovTh8156l6X6535JqWrrn2cJzUlZCyAE5kYRW9ygTPvd6vryopt+f+M90tbYEm3717PKHr/AZQoAAICSFE0AF3h8qvaKH0lfPXhzaJakFT/06nZWXbLqn9N21T+bOuacrDrmQITmyJ3zlf5aRMcfv/e20Fxu99eXKR5p5DIFAABAqbaZMkW4EmG8GZzvWi2tG5RW/cyamj2VVT/3csPukFX/nKwhMMfm7c1nZdUxB2bxg+4vL9Jw50rteKCy5wqpdV/gMgUAAIBkbekKaztb1JcHp2qv+JE1FfuOWUp4I9+RmjZK54e82rjNknab8NytDZMVn+Dz9ua7FbAl9mOLG5R9eJk23rNgzkEbAAAA4VZoa41I2uqTtztiwm3e/CoXlxQxv6oaPY+Ojg0H6NCOS8qZdspJiplf3fLW7ILV3gnOU9Uyz2bVK9L7G7x+MmyUVZtcUT3GvL35eJBCc2la9vb7qxs5br5z/pQhPLF8gWKLG9T30SUWEQMAAAi+bo+Hvz5JfdHRsdwcHwjETJhOmF+zhcWhgBzPIUmZ6OhY3zR/njZtk5VHZt96IzhXOsp8q0UPSsuekc6+7vUTY7sONmYqXDQsHZTQnFyzRJn2u6cMv5Xq//jSjCF8xwMR7clfUPIPZ/k6AapUaGuNREfHmPYFQLJGwQCCc2X2SMrONSyXi46O5WWNtvaVvpPNZ+2WtX7SrQE96fPjOCEpHR0dy1TYNolCW2tWHpht4G5wXhS3Fv9a9GD1r7Hy76Vzv/HK9lQz5kgTiqdltpvq8vtdLbF8gdJfi8x5WvZtV9Wnn18PxJE75yv3rS9q/RSLhW2NLVH+4lWl36PfD1QpLmt6FADEaQJ4tYvpofcyIilVS2CeISwWZY2yZk2ITsqaupwNwBTtEUnJuX6O6OhYstDWGpfLU7fdDc6R79T+Go0t1irbJ3/q9RMlFoYvq0z73VVPy75V+r2iip9+br3uf7p7ytB8/alEbAnBGQAAIIDMatpemZG5Jzo6lqzHDzIhOhOQwzgiKVHDDLeUrEWTXTM/EIdhxY+kOzw/syimgKullvlW4xevKvPBXyVZC4RtjS2Z8e+vXtwgAAAABFLCI+9jW71Cc8DUGpplRvddre8ORnC+o1lqeYVT0kWRO+crdb99W0dl8xeu/+9M+900MADQ0QUQXl6YlbkrOjqW5VDM2YSs6dl2TA11tf3nB+aQRLdIi9gP3S3JNUtqWgTsVpmjN0abGU3mSxGOYzEgACUbaQLQR7jNUHR0LMVhqC4m2FibnQtucL5rdX0/zSpGnesVkpNrbp46HbMx3A6duXK9trn7XvZxDpFmswgGQtAhKbS1dtPsBDB4k9kCBvCS1S7//CSHoDozbDdVzWvlgxmclz1jrZhdT03flJr4nnZKYvkCDXeu1O6vL9Pury9TYvmNVbPjSxtt+zm501eu/+/uLxOcw3aa0QTBD85l+zIi+AGMmSTciwG/30f2uB3YcJOR4ATnOyLSf/j/pNj/O/d9me2wppfTyWaxxQ3q+8ZyHdh083ZQ5cHZTqXgHFvcYOv0b9BZg/vB2cwq6FNA9qsH13RAMSMEXuL2bLQMh8BTXNtGx95UEnlCevB/2bPNVLUaW6zRbtgi/bWIhjtXqquOI7/D5yavB2fQWUNdrK7j1MyMXN6HEXWVpAl8qYvp2vAQN8/F8QDsnQyb2JNM7lotxXqtqdJesOoV6dxvpM/Y17daieULlP36MlcW5irVNyO0AS7pxqqVhbbWpAnuEUl5SVmz9UGYAk7a4TZOS9rKaR4q6wttrQk3rqVbrulhc03TAa5cWnV+8GH26k3r5vr4PZJSNq3IC4LzXOVofpTUPuK88kWrltkroVmypoiv+CFHt5o70+IG5b71RR3Y9EVWs4ZbMvVcJKzQ1postLXmJe2W1GU6bFslHTAd7zAFZ6dDzA5O71DK1uuaLrS1Rgptrekpruntkg6xKN2cbDVBtl734WFJB3T7onJbxZoIcE+eJoA9wXnFj6zgfIcHS9VWvlj/Vb19LHLnfKW/FtHxx+/VxnsW0CBwU7OsGlgnO2kx07kums71ai+EeJetNiPCToXm3T5vnxiXZvXnlhyuETTXdMZ0cnfMdE1zOOakz6mFmcruw3lzf5iphIOp4yA4w3W1DSmefd0KzStf9OanW/n30vEejvIsur+8SJn2uxlhhpdsLLS15iR12zk9z4w2JWWNQlUa4uMKz1StVKGttc/O6ayFttasgjE9m057bbYW2lolG6fcmodapWu60i01VhfaWuNM2a5Ys6Rcoa01HR0dy9h4zLrncB8uvwYJMSA4w6fB+bOidPKnUuF1b9U4l0S3WOH+/BBHeqpvoMUNyj68jBFmeDY8S8oX2lpT1dY8mxGKhPnVLVZyrrSTnKg1WJRtORWUPQLZVsmG8CwpYUJYrdd0NcGrhP3i535feNU8eMxK6pvLww8z3bv0iz1D4TfcL2BTcC7527h0tMNazXrVK96aur3yRekowflW3V9epOzDy9juCX7osO02UzD7ZI385iUNl3fczChGKdgkZI1MJDT9dE3MHp6remBhjkXK/ArSg4pmRiptsdpc02lzPVd6TcfNLz9e0/mAHLuN5tfuQlvrkPlc+WmCRtzch7kHw+/icrh8DGELziVnX7dWs175oncW52r6prVNVvE3HO2y0LzvG8tpiODLKTiLMTXLGq3aWtax9vL7HZK/R1ZKDyxSsmpCZx1hMnWQSfMrqCP73bJWZ4Y9AdpP1zTBeeoQDQRdjCaAM8FZsqZvf/i8dPofvDN9u+XnBGcjHmlU9uFlnn1//R9f4iAB3rFe1qI9uwttrSMmAJQHx9LIUlzhmAaflMNbdgEAbpOTewMBrMQPB4Nzyd/Grfrndfvd/5SNLdYo+Mmfhv6Ae3V69tCZK0q/V1Tu9JUbd6ovL+IKhV8Fcb/R9eZXV4iP62ozhd2tlZnzXFoAnGTKJBKyHogmprkP5SXl3Nif3QXNhbbW7ujoGNO1ofAso7ziR9KpX1gj4iGV/lpE6yONnnpP4xevKn2kqOzxCzcFZlb5hs8NhzxgBvpWWmhrzblU60xwBuBUYE6qskX3SlP0dxTaWidkLRiXiY6OOXl/crtEJiXqnKFa93H2Ey9vm1UHkTvnK3X/FzzzfiY+/Vw7jxQVHzh5PTTHFjco960vat83lhOa7VGkCVxDwAmu0uJprLINv3T6gZkCc3fZXtpzfeDbLGm7pOOFttasU3tt27ktZZU2mtXhQXAOkRU/lO4K5wKPqXVf8MwU7T35C4r99iOl3yuq+Onnitw5X5n2u3X88Xur3hpr/OJVrubbv2jorBGc4Wx4TptpjYCXO/3AVIE5Umhr7ZO0T/asfr5V0rAZuXaC21vk9HG/R/j2Ilr181Ae6GRsievvYejMFbUPnFTyD2dV/PRzK9Df/wXlv3Ovttc4Gp47c4WrGV7CQ4twhOcdsvYa7zMhurvQ1ppwamQiJPWEAJwPzXFZC27ZXVJU2pEhG8Dv1dIDU8IzwTlEIt+RmsK1g0I80ujq1Ofxi1e16cAnSvz+Ew0XJyVJieULlH/8Xr3afrctI+Hli4rhJiM0Qf2ZEaZxWiI0AbrLhOh9kg5IOlBoay0ynRtlhmgCeCw0r3fwx2x1IDznPNB86wnPBOfwCVmtc/e97qxOPfHp53ru0F8U+91H14NtqY75wKYv2hbmxy9evWlxMdyEKYLuYdSZQJ1zoOaPAMa9GKg2NEdMAK3H9oF2h+ecR5pxvawp6TwYJTiHRNM3pWXPhObjJpYvqPvP3HmkqNhvP1Lmg79KshYnS38tUlMd83TSR+iPEN48KUcTEJ5l7f1MAAP3Ynjle6m5jj9va6GtNWXHC5mZXF6ZRbda0qFCW2vG6dHnQltrzJQC5czPi3EaE5zrb+XfS3eEY6aF3UF1Jv0fX9Ka391Y+EuSkmuWKP+de7XjAfvbe+jMFUabZ5anCQjOIICB44ZwK7S1puXs9OzppG0Me1mPNet2WetcZO0cgTZrZWTMaufHZZUCbdSNFcyTnNHuCO+eP40t1irbJ38a6I8ZqdNK2rnTV5R+r3hTrXFi+QJl2u92bO/oiU8/V/d/P81VTGfNk6KjY8Nmj8tmWoNrkGua84AmgIuhOWbClxuaJWVk7RFdqz5Jr3qseZtlrSi+tdDWOm7eY07ScCV7W5tjE5OUML8qWYgpU2hr7WPFfoJzfa34kXTqF9JnwT3v4ksb6/Jz0u/daMPY4gZl2u9W15edq60eKU6q++3T10e1MW14yxXaWmkI9/SZL1SE00R0dKzP5tfM0ay+vBfnTad6Na0BF6Rd/vldhbbWRK07A5jrqF/2rwZul9WyRoW3m1AsWdPLpwoasRruB80mZPdxatfX/FB/+juapZZXAv0Rh89NavPbpzViVrO2U/6WvZPL65idCs2lBcfiAydv+/mYFosJuRucwfG3M4B5qc4Pc5OjCVBvpgbXCw9wkza9TtZnh2C9rFHkW3/V+hCNxckIzi6IbpHuCu4D4OKnn6vv40tK/P4TjdsUNIfOXNGmA5/cVFucXLNEw50rHaljLle+4BgIb56/vVijjRO0RGg51cEjgBGcgUp1e+R9bLVjIS3zvcp2jyA4uybWG7iPlFi+4KbVtIuffq7Uob/U9JrjF69q27+eVeL3n1yvZU4sX6Dct76o3V9fVpe9opmaTXCm/eET47VOS3QhkIN7AQjOjnZPbXqdNIcVBGe3NH1TatoYiI+SXLNE+cfv1YFN1l7J+cfvVdwsztX38aWqRp0nPv1cO48UFR84eX2UOba4QdmHl+nApi/WddVuzJ1ZnIKpne7J0ASEJJuv6WEx4uLHe3FR0h5aAj4Nq3aI23QtZenXgODspjX+H3XOPrzstpHf1YsblPlPd1///7kzV+b0mnvyFxQfOHl9e6lSHfNw50ptjS1x5HOUgjoIbwHpLA+LOnOuOQdu+TSxP7+qaQLUi1mx2Us7O9gZ4lMcYRCcJan4W+nS4fr+zMYWadkzvg7N0wXZjfcsUMyE6UoX1CrVMSf/cPb6vymvY252aJur/o8vXQ/qsBW1tnSWvSqI5+VIJduQeDyYwwFm+j4P0lAvMY+9n4jN11I/hxgE50vD0vsbpA9/LH1Wxz7VqlekOyK+O4jdX1406+hvrML646nqmOORRsfrmEeKk9p04BN1v3162nA/ziratXzBFOlou9r+WTG1dir9sm+lVS/J1Oma3sUp5EtpmgAhtd7m10uKQQGEPjiXnPoH6fBXpMIb9fl5dzRLK37oqwMYuXO+sg8vq/l1pqpjLr32oc6VjtUxT3z6ubb961nFB05eD+rTmes0c9zW0U4T3lyVpAluMmLaJBfAz1avRaDSdBp9eS/OiZEywI5rqShvLX4GgrPLPitKx3uko4/VZ/r2ih/5anuq5JolNU+bvrWOWZLSX4so/517HatjlqSdR4qK/fajm7a1mrGHyPRtwpv/O8tM0bSMS0pER8eKpuMTpBDRbz5TvTqNaU4n396LeeiBsLH9nDffrTtpWoQ3OE9OMSh2fsiavp3/v5ydvn1Hs7Ty730VnKtVmh5dXsfc/eVFyj9+r+N1zGt+99FNQX2691ey7V/PVlyfjVm/YJjeSWfZ7Y5T9y3hMkjb9GTrfE1nxOilH+/FRfEgE+Ez7ND1lOY+iPAG57/NMJv07OvW9O2TP3XwG22LL7anii1u0Hqz1dSceq1TTI8u1THv+8ZyV+uYy3W/fVo7jxTVXjZ9HLZ8waTENg5utX1e4R4hnJA10nxr5ykowXkiOjrmxmdJck378n7QJ+k5WgJ+C6o1cHI2DvdBhDQ4z+azohWcRx2sf175ouebIV5FaM4ev3DT9OjInfOVab/b8Trm5w79paI65nL5i1eVfq+o4bKRZ9gmwRdM5aeizZ3lsI4QTheag7S/bdalAFYavWTqbwXnoZl545XwnBF7O1di3EvHzS/MvcFLa5vkHP6s9G1AcJ7W38Zv1D+f/+fqXuP8P09dP930TSnyhLeD89K5B+f8xavXp0en7v+C8t+5V9vv/4Jj73HXB39V7LcfKfPBX7navPdlyhfM7HY6tK1QMmRtP21oLpMmONd0TQ+ba5rwPDPP7f0aHR1LEp5nvX+wAJQHw6rX3gt9GxCcKwq/Q9LRjhrC8zT10y0/D+RBTyxfoPzj9+rV9rsdq2MeOnNFa373kVKH/jJjHTMIzx7uqG0zdVNOtX0yJCFnRFJsltBcmsbu5/AwPttnrGN4ZvX8qa/pzWZrOC/ej5Ni2vZU+iu5f2BGXimFqcs9sqxvQ80zCM6OKtVPn/qF9f8bW6xVtgMitrhBuW99UQc2fdGxOubxi1e16cAnSvz+Exbz8ld4ZrXnG4YkxZ3uYIdkhLBfZvXsCv9+2sftkfHINT0sKS4eiE0VvjxdS2+mbW8TswakGw86uuu1Sn2Av+f75I2Hadk6fuZidHSsWyyGCoKzwz4rSh8+L73/n63p2z6oda6oN/q1iI4/fq/jdcyx3300pzpmeCM8R0fHEmI7hwlJz0VHxxIOTc8OW3h+bq6dXp8vntbnsWs6TqfRf+HLPLBLKNwPPvbIBw86/NYN9MC1mHHhekpJ2iweRoHg7LBLI9b0bydX764jpwKzZO0DTR1zIAJ0WtImhXOaZ6mj5sYX+3DAOsrjktqrbUufLpY0VK+HLVV0GsN6Te/ya/iKjo4NmwcfO0PW4R+StCk6OpZklNn2cyrr8n0g49YxNfeAuJhZB4Kzwz4rSqf+gXaY7hvuzBW1D5xU8g9nqWMOzpdrLjo6FgtRh80THbWy8Oz3mqxdsqa511rH5rct07JevqZNpzEso8/9ktZER8dSfg9f5mFmXMFfOGxc1poSCVbOdlTSpZ874tR6IXO4lvJmZl2QSiHynNIEZ/jhG+7iVW1++7QSv/+EraKCG6CD3mErBWbPdNTKarKe8+EX+5CsUWZbworPFq6bkMf3oTbnVkrSmhBc091eHP2vscOflDVzIGgjZqXAHPPqom0B+17Pqf4lWRMuBvap2iArKSb/Dw54/nuH4IzQm/j0c+08UlTsdx+p7+NLNEjwv2RLHbZSZzsIT2n7vRaYp2j3jHlo4YfR53FZNaQJu1dLLavT9XrQ6/NR/eyt13QQ7JH10CbQo5VmNlAiIMeudB8mMNf/PErX+fxJem1FdPPdkvZxgC5t70g5g0vBmYJ5zN4zMXXM6fcCc52ytcXcO9sxWaOhfqvFHTdfjmvMaFTOJ23eLe+OMg3pxkhRn8NtkZS1uItX63SzPr6ml5pretyH1/RzkpaaMovQ3M9vOXbbfHQ/Lh0zt+/DOZ8d8qID51CyTuF5m5fXGLglQPvhWuo377Pa7dmCFLTduuePz7v2P+5MS9rhyMs3bZTW7Z/7vzv6mLW38lytG5Savjm3f3P+n61FwOrR0dwwmZjpL8zbm09IOlDpC6a/FtGOByLOvukzV5T6n38J2pTsCUmxa0/GeFpXpUJba1zW9KtuSas92knrk5QNQqfatHfKtHezi9dNn6xFXoZdaoeUaQevnHN7TCeUa5pr2s1jFzPHrVvSRg+9tRFzzPq8dMwKba3Dktb7pa/i1Mhioa01I2m7Q+874cfr1GP3wXFZD3r6JOVqPQ8Kba3dkvYF4XvS3POGXegPbZt37X/cGTEHxv6byB0RqeUVKbqF4Oyz4Dx+8arSR4rKHr8QxH7GtmtPxrJ0t2zvtCXMLzeC3YS5j+XMF8xwgNs7adq5HiF6vOxLu89DbdBdFhTcOt8ybi9443DnMeGha7ovSHXLdbo+SscwXsfjN2Q6szk7OvoOtk9E1tZIWz18GIckpZz+Liu0tSZkzZqxKyT2y5qeXQzAdVTvvs3ILddP3oHP5NTDkpk+kyPTys33VEb1eVg4LikdHR3Lzrt27Zp0sNG58CxJd62WYr2Vh1qCs2vBeeLTz5X54K/KHP1rUFfKJjTX58smXtZxi8neJ7cjsqYc5WStKjkc1hGosoATN+1cyxfIuGnPnPnyHvZDWDEdv/Jzzc7vsQnTFvnSueaXdnHgPCudY05f06Fs4zrck0vHLmKOpaq4X5SuB5n/Xr8Pc7x8fX5EZM3kSdUQDodMsMiF5Doq/e/IHL9zyq+hnLmGhuvZbuZ+3l2HHzUcxL3YreBccrAxadK7M09VmjZKa3qlxhaCsweD8578BaXfKyp/8WoQ73lDklLXnowxxc/9Lx2ZjlslJ2+pc1a6CTO9vrJOULzst6a675SCoCQVg/bgYYo2KD/3NEt7cK5xTYf5mJbuF4ThcB7/pG6Mss6WBSifmD6YRoL43Ypbg7MVniOS0nJyKH/Fj6SVL0p3NBOcPRCch85cUfq9onKnrwTxHB83gZll+wEAAOYWAMsfiuV1Y6YXD70QOg23/c6GyaKklA42ZmTVPdg/d/zUP0hnX7fC84ofchRcMvHp50od+ktQ65gnJGWuPRlLc6QBAAAqVzZamqM1AMv0+zhvmMybEdJNcmKris+K0ofPS6NfsUZ9UVc7jxQV++1HQQ3Ne2Stmk1oBgAAAOBgcL4RoHPaMBmTtf+e/Xs+/23cmir97/9FmjzBEXFY/8eXtOZ31n7MAVz8a0hS+7UnY0m2mgIAAABQv+B8I0BnZC0CssuRd1L8jXRkg3Typ9ZoNGy364O/qvvt00Fc/Gtc0uZrT8YSLP4FAAAAwG4Nc/rbTtc/f1a0gjMqUpyc24hxAEeYqWMGAAAA4Lj5Vf0rp+ufUZGAroJdKeqYAQAAAHg4ON8I0M7WP2NGw8VJDZ25PTwPnbmi5w79JagfmzpmAAAAAHXVYMurbJjM6GBjVk7v/zybu2KhO4Dd//20Uuu+oMTyBSpOfq6+jy8pe/yCEssXBO2jjktKX3syluWyBQAAAOC/4GyFZ+f3f55NY0voDmDx08+Vfi/QA68TkjKyapkZYQYAAADg4+B8I0DnJSV0sLHbBJ7VNLM3DJ+b9Ntb3iNrlDnP0QMAAADglvmOvfKGyT5T/7xT1D+7bqQ4qb6PL/nl7Q5J2mTqmAnNAAAAAAIanG8E6LSs/Z/30Nz1U75V1UhxUonff+KHtz0uaZvZjznHUQQAAAAQjuBsheeiNkwmJbXLGk10xvv/Wbp0mKMqa8Xt9oGT2nTgE8UHTnp9D+cJWTMT4iz+BQAAAMBrGur60zZMDsvJ+udLI9L7G6Rlz0irXpHuaA59ePYB6pgBAAAAeNp8V36q0/XPZ1+XDn9FOvULjrB3UccMAAAAgOBcQYBOy6n658+K0ofPW9O3z/8zR9o7qGMGAAAAQHCeY3h2tv750oh0tEP69/8iTZ7giLuLOmYAAAAABOcaAvSwNkwmJG2WNSppr+JvpMP/QTr5U+kzdseqs35Ja649GUtfezJWpDkAAAAAEJxrC9B9kuJyqv755E+pf66fEVl1zN3UMQMAAAAgONsbnoum/jkuJ+ufR78inR/iLLDfhKw65jh1zAAAAAAIzs4G6Lypf94kJ+qf/zZujUDDTjslxahjBgAAABAUDb54lxsmc7L2f05KSsvu/Z9hh35JKaZkAwAAAAia+b56txsms3Ky/hnVoI4ZAAAAAMHZY+HZ2fpnVIo6ZgAAAAAEZ48HaGfrnzET6pgBAAAAhEaD7z8B9c/1NCQpyZRsAAAAAGEyPzCfhPpnJ43LqmNOEJoBAAAAEJz9HZ7L65/7Obw1m5D03LUnYzHqmAEAAAAQnIMVoPPaMNktq/55hMNclV2y6pgzNAUAAACAMGsI9Kez6p/jpv45I6mZQz4r6pgBAAAAoMz8UHxKq/45Jqv+GVOjjhkAAAAAQhucrfBcqn9eI+qfy1HHDAAAAAAE55sCNPXPN1DHDAAAAACzaAjtJw93/TN1zAAAAABQofmhb4Fw1T9TxwwAAAAABOeqwnPQ658nJO2kjhkAAAAACM61Bujy+ufxgHyqPbLqmNMcYAAAAAAgONsVoHPaMBmT9Jys0Vo/GpLUfu3JWPLak7EiBxUAAAAACM5OBOiMrPrnXT561+OSNps65mEOIgAAAAAQnJ0Oz0VtmEzJqn8e8vA7La9j7uPAAQAAAADBud4BOq8Nkwl5s/6ZOmYAAAAAIDh7JkB7qf6ZOmYAAAAAIDh7NkC7Wf9MHTMAAAAAEJx9EZ7rXf9MHTMAAAAAEJx9GaDrUf9MHTMAAAAAEJx9H6Bnqn/OV/mqQ5I2UccMAAAAAO6Yd+3aNVrBCQcbI5IykraaEJ3QhslZ65Hn7c0PS1ova+Q6fe3JWJbGBAAAAAD3/G84USjSmZq5lgAAAABJRU5ErkJggg==') no-repeat",
        "background-size": "100%",
        color: "transparent"
      }
    },
    ReactComponent: {
      root: {
        position: "relative",
        "margin-bottom": "60px"
      }
    },
    TabButton: {
      button: {
        position: "absolute",
        top: "15px",
        right: "0",
        "text-transform": "capitalize"
      }
    },
    ToolbarButton: {
      button: {
        display: "none"
      }
    },
    Pathline: {
      pathline: {
        display: "none"
      }
    },
    Table: {
      table: {
        position: "absolute",
        "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.1)",
        "background-color": "#ffffff",
        "max-width": "800px",
        right: "0",
        top: "70px"
      }
    },
    SectionHeading: {
      root: {
        "border-bottom": "1px solid #ccc"
      }
    }
  },

  require: [
    // Include our main scss file.
    path.join(__dirname, "src/styles/Typography/fonts/TuttiFont.css"),
    path.join(__dirname, "src/styles/Typography/fonts/Nunito.scss"),
    path.join(__dirname, "src/index.scss"),
    path.join(__dirname, "src/normalize.scss")
  ]
};
