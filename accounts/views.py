from django.contrib.auth import (
    get_user_model,
    login as auth_login,
    logout as auth_logout,
    password_validation,
)
from django.core.exceptions import ValidationError
from django.shortcuts import redirect, render

from accounts.forms import SignupForm

User = get_user_model()


def logout(request):
    auth_logout(request)
    return redirect("app")


def signup(request):
    data = {}
    if request.method == "POST":
        form = SignupForm(request.POST)
        next_url = request.POST.get("next", None)

        if form.is_valid():
            try:
                if User.objects.get(email=form.cleaned_data["email"]):
                    data["error"] = "user-exists"
            except User.DoesNotExist:
                password = form.cleaned_data["password"]
                try:
                    password_validation.validate_password(password)

                    user = User.objects.create_user(
                        full_name = form.cleaned_data["full_name"],
                        email     = form.cleaned_data["email"],
                        password  = password,
                    )

                    # TODO: Maybe switch to more rigid login process
                    auth_login(request, user)
                    return redirect(next_url or "app")
                except ValidationError as e:
                    data["error"] = "bad-password"
                    data["error_messages"] = e.messages
    else:
        form = SignupForm()

    data["form"] = form
    return render(request, "signup.html", data)
