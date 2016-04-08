class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions

  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token


  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def angular
    render 'layouts/application'
  end

  def user_search
    user = User.search_by_email(params[:email])
    if user.empty?
      render json: { user_exists: false }
    else
      render json: { user_exists: true }
    end
  end
end
