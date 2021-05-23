function scriptLoad() {
  const passwordInput = document.getElementById("password_input");
  const validationErrorList = document.getElementById("validation_message");

  const passwordStandards = [
    {
      regex: "[0-9]+",
      error: "Should contains Number.",
      required: true,
    },
    {
      regex: "[#?!@$%^&*-]+",
      error: "Should contain special Characters",
      required: true,
    },
    {
      regex: "[A-Z]+",
      error: "Should contain Upper Case letter.",
      required: true,
    },
    {
      regex: "[a-z]+",
      error: "Should contain Lower Case letter.",
      required: true,
    },
    {
      regex: "^.{8,16}$",
      error: "Should be 8 to 16 Characters in length",
      required: true,
    },
    {
      regex: `^(?!.*${new Date().getFullYear()}).*$`,
      error: `Should not contain current year - ${new Date().getFullYear()}`,
      required: true,
    },
    {
      regex: "[^a-zA-Z]{2,}$",
      error: "Should not contain 2 consecutive non-alphabets",
      required: false,
    },
  ];
  const passwordValidator = event => {
    let errorList = [];
    const passwordValue = event.target.value;
    if (passwordValue?.length) {
      const failedStandards = passwordStandards.filter(standard =>
        standard.required
          ? !RegExp(standard.regex).test(passwordValue)
          : RegExp(standard.regex).test(passwordValue)
      );
      const emptySpaceLength = passwordValue.match(/\s/g)?.length;
      if ((emptySpaceLength / passwordValue.length) * 100 > 15) {
        failedStandards.push({
          error: "Should contain less than 15% whitespaces",
        });
      }
      errorList = failedStandards.map(fStd => `<li>${fStd.error}</li>`);
    }
    validationErrorList.innerHTML = errorList.join(" ");
  };
  passwordInput?.addEventListener("input", passwordValidator);
}
