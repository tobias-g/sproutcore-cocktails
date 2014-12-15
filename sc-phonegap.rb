require 'fileutils'
require 'pathname'
require 'optparse'

# create config object
config = {}

# parse command line params to populate our config object
argparser = OptionParser.new {|opts|

  # '-a' param is the application name we want to build
  opts.on('-a', '--application-name [name]', "The application name (required)"){|name|
    config[:app_name] = name
  }

  # source directory (defaulting to current directory)
  config[:source] = '.'
  opts.on('-s', '--source [directory]', "Source path (default: .)") {|source|
    config[:source] = source
  }

  # output directory (defaulting to www)
  config[:output] = 'www'
  opts.on('-o', '--output [directory]', "Input path (default: www)") {|output|
    config[:output] = output
  }

  # build mode (default to production)
  config[:mode] = 'production'
  opts.on('-M', '--mode [mode]', "Mode (default: production)") {|mode|
    config[:mode] = mode
  }
}

# parse arguments
argparser.parse!

# join strings as tmp/build
config[:input] = File.join('tmp', 'build')

# Converts a pathname to an absolute pathname. Relative paths are
# referenced from the current working directory of the process.
# i.e. get absolute path of source directory
config[:source] = File.expand_path(config[:source])

# get absolute path of output directory
config[:output] = File.expand_path(config[:output])

# store the build start time
start_time = Time.now

# log the build is starting
puts "Starting at #{start_time.localtime}"

# log the command we are about to run to perform the build
puts "Building: sc-build #{config[:app_name]} --languages=en --mode=#{config[:mode]}"

# delete old builds
FileUtils.rm_rf config[:input]

# run build command
`sc-build #{config[:app_name]} -r --languages=en --mode=#{config[:mode]}`

# get build static code directories
built_path = Dir[File.join(config[:input], 'static', '*')]

# log we are copying the built code to our specified output directory
puts "Copying to #{config[:output]}"

# clear down old builds in our output directory
FileUtils.rm_rf config[:output]

# create static folder to copy into
FileUtils.mkdir_p config[:output] + "/static"

# set where we will copy the static content to
deployed_path = Dir[File.join(config[:output], 'static')]

# log which static folders we are copying
puts "copying #{built_path} to #{deployed_path}"

# perform the copy
FileUtils.cp_r built_path, deployed_path

# from here we edit some of our sc-build files in the cordova
# project to be the way cordova expects
puts "Cleanup"

# get folder for application static content
app_path = Dir[File.join(config[:output], 'static', config[:app_name], 'en', '*')].first

# log static location of application
puts "app_path is #{app_path}"

# in the index.html of the application modify all the references
# to static content to point to the new correct locations in the
# cordova structure
['index.html', 'javascript-packed.js', 'stylesheet-packed.css'].each do |file_name|
  path = File.join(app_path, file_name)
  if File.exist?(path)
    data = File.read(path)
    data.gsub! /\/static\//, 'static/'
    File.open(path, 'w+'){|f| f.puts data }
  end
end

# move the index.html to the root of our cordova output directory
FileUtils.mv "#{app_path}/index.html", "#{config[:output]}/index.html"

# we're done. remember the end time so we cal log time elapsed
elapsed = Time.now - start_time

# log time elapsed
puts "Ready (took #{elapsed.to_i}s)"