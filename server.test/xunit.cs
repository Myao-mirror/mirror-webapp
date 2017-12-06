using System;
using Xunit;
using FluentAssertions;

namespace server.test
{
    public class UnitTest2
    {
        [Fact]
        public void Test2()
        {
            var Test2_expected = 11;
            var Test2_actual = 2 * 5;

            Test2_actual.Should().Be(Test2_expected);
        }
    }
}