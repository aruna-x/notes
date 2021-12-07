class Tag < ApplicationRecord
  belongs_to :collection
  belongs_to :note
end
