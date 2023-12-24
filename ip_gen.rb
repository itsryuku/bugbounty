irb --simple-prompt --noecho
require 'ipaddr'

# RFC 1918
# 10.0.0.0/8, 172.16.0.0/12,  192.168.0.0/16
#IPAddr.new("10.0.0.0/8").to_range.to_a.each{ |ip| puts ip }
#IPAddr.new("172.16.0.0/12").to_range.to_a.each{ |ip| puts ip }
#IPAddr.new("192.168.0.0/16").to_range.to_a.each{ |ip| puts ip }

# prints up to NUM ips from the range
def random(num,range)
	0.upto(num) do |n|
		r = rand(0..range.size()-1)
		puts range[r]
	end
end


# example print to only print common gateway ips from a range
IPAddr.new("192.168.0.0/16").to_range.to_a.each do |ip| 
  partial = ip.to_s.split(".")
    if partial[3] == "1" 
      puts ip
    end
end
# example print to only print common gateway ips from a range
IPAddr.new("10.0.0.0/8").to_range.to_a.each do |ip| 
  partial = ip.to_s.split(".")
    if partial[3] == "1" 
      puts ip
    end
end
# example print to only print common gateway ips from a range
IPAddr.new("172.16.0.0/12").to_range.to_a.each do |ip| 
  partial = ip.to_s.split(".")
    if partial[3] == "1" 
      puts ip
    end
end

# example print to 300 random ips from a range
random(300, IPAddr.new("192.168.0.0/16").to_range.to_a)
