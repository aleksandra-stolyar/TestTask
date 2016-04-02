class Product < ActiveRecord::Base
  validates :name, :price, :details, presence: true

  validates :name, length: { maximum: 250 }
  validates :details, length: { maximum: 1000 }

end
