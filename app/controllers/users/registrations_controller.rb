class RegistrationsController < Devise::RegistrationsController

  def create
    super
  end

  def destroy
    super
  end

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    resource_updated = resource.update_without_password(account_update_params)
    yield resource if block_given?
    if resource_updated
      sign_in resource_name, resource, bypass: true
      render json: {user: @user, message: I18n.t('user.update.success'), status: 201}
    else
      clean_up_passwords resource
      render json: {message: I18n.t('user.update.error'), status: 500}
    end
  end

  def check_params
    if params[:user][:password].blank?
      params[:user].delete("paassword")
      params[:user].delete("password_confirmation")
    end
  end

  private

  def account_update_params
    params.require(:user).permit(:name, :surname, :phone, :email, :password, :password_confirmation)
  end

end