print("BEFORE IMPORT")
import argparse
print("AFTER IMPORT")
for i in range(10000):
    print(i)
print("AFTER LOOP")
parser = argparse.ArgumentParser(description="calculate X + Y")
print("AFTER2")
parser.add_argument("x", type=int, help="the first operand")
print("AFTER3")
parser.add_argument("y", type=int, help="the second operand")
parser.add_argument("-v", "--verbose", action="store_true")
print("AFTER4")
args = parser.parse_args()
print("AFTER5")
answer = args.x+args.y
print("AFTER6")
if args.verbose:
    print("The answer to %d + %d is %d" % (args.x, args.y, answer))
else:
    print(answer)