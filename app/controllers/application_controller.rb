class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions
  # DeviseController.respond_to :json

  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def angular
    render 'layouts/application'
  end

end
