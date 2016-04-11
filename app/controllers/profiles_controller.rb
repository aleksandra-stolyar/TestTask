class ProfilesController < ApplicationController
  def update_password
     @user = User.find(current_user.id)
    if @user.update(user_params)
      binding.pry
      sign_in @user, :bypass => true
      render json: {user: @user, message: I18n.t('user.update.success'), status: 201}
    else
      render json: {user: @user, message: I18n.t('user.update.error'), status: 500}
    end
  end


  def user_search
    @user = User.search_by_email(params[:email])
    if @user.empty?
      render json: { user_exists: false }
    else
      render json: { user_exists: true }
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

end