class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email,
    presence: true,
    uniqueness: true

  validates :password,
    presence: true,
    format: { with: /[a-zA-Z0-9]/ }, on: :create

  validates :password,
    allow_blank: true,
    format: { with: /[a-zA-Z0-9]/ }, on: :update


  def self.search_by_email(email)
    where('email LIKE ?', email)
  end
end
