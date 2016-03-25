class Document
  attr_accessor :title, :author, :content
  def initialize(title)
    @title = title
  end

  def words
    @content.split
  end

  def word_count
    words.size
  end

  def self.bar
    return 'BOOZE'
  end
end
