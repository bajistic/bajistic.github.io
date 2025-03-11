require 'mini_magick'
require 'fileutils'

module Jekyll
  class ImgTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      # Parse the input (e.g., image path and preset name)
      args = @markup.split
      path = args[0]  # e.g., "/assets/images/my-image.jpg"
      preset = args[1] || 'default'  # e.g., "default" or "thumbnail"

      # Access Jekyll site config
      site = context.registers[:site]
      config = site.config['img_presets'] || {}
      sizes = config[preset] || [400, 800, 1200]  # Default sizes if preset not found

      # Generate resized images for each size
      resized_images = sizes.map do |width|
        generate_resized_image(site, path, width)
      end

      # Create srcset for responsive images
      srcset = resized_images.map { |img| "#{img[:path]} #{img[:width]}w" }.join(', ')

      # Return the HTML
      "<img src=\"#{resized_images.first[:path]}\" srcset=\"#{srcset}\" sizes=\"100vw\" alt=\"#{File.basename(path, '.*')}\">"
    end

    private

    def generate_resized_image(site, path, width)
      # Define source and destination paths
      source_path = File.join(site.source, path)
      dest_dir = File.join(site.dest, 'generated_images')
      FileUtils.mkdir_p(dest_dir)  # Create folder if it doesn’t exist
      filename = File.basename(path, '.*')
      ext = File.extname(path)
      dest_path = File.join(dest_dir, "#{filename}-#{width}#{ext}")

      # Resize image if it hasn’t been generated yet
      unless File.exist?(dest_path)
        image = MiniMagick::Image.open(source_path)
        image.resize "#{width}x"  # Maintain aspect ratio
        image.write dest_path
      end

      { path: "/generated_images/#{File.basename(dest_path)}", width: width }
    end
  end
end

Liquid::Template.register_tag('img', Jekyll::ImgTag)
