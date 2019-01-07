import argparse

parser = argparse.ArgumentParser(description="calculate X + Y")
parser.add_argument("x", type=int, help="the first operand")
parser.add_argument("y", type=int, help="the second operand")
parser.add_argument("-v", "--verbose", action="store_true")
args = parser.parse_args()
answer = args.x+args.y
if args.verbose:
    print("The answer to %d + %d is %d" % (args.x, args.y, answer))
else:
    print(answer)