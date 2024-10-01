class BlankIndex < ApplicationRecord
  belongs_to :problem
  validates :index, :problem_id, presence: true
end
