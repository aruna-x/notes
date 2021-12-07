class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :text
      t.string :image
      t.string :source
      t.string :thoughts

      t.timestamps
    end
  end
end
