class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email,
    presence: true,
    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i },
    uniqueness: true,
    case_sensitive: false

  validates :password,
    presence: true,
    length: {in: 6..16},
    format: { with: /[a-zA-Z0-9]/ }, on: [:create, :update]

end
