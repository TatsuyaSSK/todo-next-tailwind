class CreateBlankIndices < ActiveRecord::Migration[7.1]
  def change
    create_table :blank_indices do |t|
      t.integer :index
      t.references :problem, null: false, foreign_key: true

      t.timestamps
    end
  end
end
